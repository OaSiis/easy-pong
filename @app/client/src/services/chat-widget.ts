export class ChatWidgets {
    private _boxElement?: HTMLDivElement;
    private _rootElement: HTMLElement;
    private _ws?: WebSocket;

    constructor(rootId: string) {
        const rootElement = document.getElementById(rootId);
        if (!rootElement) {
            throw new Error('Element didnt found');
        }
        
        this._rootElement = rootElement;

        this._render();
        this._connect();
    }

    private _render() {
        this._rootElement

        // Container for the chat widget
        this._boxElement = document.createElement('div');
        this._boxElement.style.height = '200px';
        this._boxElement.style.overflow = 'auto';
        this._boxElement.style.border = '1px solid #ccc';
        this._boxElement.style.marginBottom = '8px';
 
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Message...';
        input.style.width = '80%';

        const btn = document.createElement('button');
        btn.textContent = 'Envoyer';

        this._rootElement.appendChild(this._boxElement);
        this._rootElement.appendChild(input);
        this._rootElement.appendChild(btn);

        btn.addEventListener('click', () => {
            const message = input.value.trim();
            if (message) {
                this.sendMessage(message);
                input.value = '';
            }
        });
    }

    private _connect() {
        this._ws = new WebSocket('ws://localhost:8080/chat');

        this._ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        this._ws.onmessage = (event: MessageEvent) => {
            console.log('Message from server:', event.data);
            this._addMessage(event.data);
        }
    }
        
    private _addMessage(message: string)  {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        this._boxElement?.appendChild(messageElement);
    }

    public sendMessage(message: string) {
         if (this._ws && this._ws.readyState === WebSocket.OPEN) {
            this._ws.send(message);
        }
    }
};