export class RouterService {
    private routes = new Map<string, () => void>();

    constructor() {
        this._init();
    }

    private _init() {
        window.addEventListener('hashchange', () => this._handleRoute());
    }  

    private _handleRoute() {
        const path = window.location.hash.slice(1) || 'home'; // default route = home
        const routeCallback = this.routes.get(path);

        console.log(path);
        if (routeCallback) {
            routeCallback();
        } else {
            console.warn(`Route inconnue : ${path}`);
        }
    }

    public start() {
        this._handleRoute();
    }
    
    public navigateTo(path: string) {
        // Logic to navigate to a specific path
        console.log(`Navigating to ${path}`);
        window.location.href = path;
    }

    public goBack() {
        // Logic to go back to the previous page
        console.log('Going back to the previous page');
        window.history.back();
    }

    public addRoute(path: string, callback: () => void) {
        this.routes.set(path, callback);
    }
}