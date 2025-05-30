import { WebSocketServer, WebSocket } from 'ws';

const server = new WebSocketServer({ port: 8080, path: '/chat' });

server.on('connection', (ws: WebSocket) => {
    console.log('New client connected');

    ws.on('message', (message: string) => {
        server.clients.forEach((client: WebSocket) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`${message}`); 
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.send('Bienvenue sur le chat !');
});

