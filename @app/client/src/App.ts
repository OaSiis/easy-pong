import { PrivateLayout } from "./layout/PrivateLayout";
import { PublicLayout } from "./layout/PublicLayout";
import { RouterService } from "./services/router.service";
import { DashboardPage } from "./views/DashboardView";
import { HomeView } from "./views/HomeView";

export function initApp(root: HTMLElement): RouterService {
    const router = new RouterService();
    
    function render(view: { render(): HTMLElement }, layout: "public" | "private"): void {     
        let content;

        if (layout === "public") {
            content = PublicLayout(view.render());
        } else { 
            content = PrivateLayout(view.render());
        }

        root.replaceChildren(content);
    }

    router.addRoute('home', () => render(HomeView(), "public"));
    router.addRoute('dashboard', () => render(DashboardPage(), "private"));

    return router
}

function componentDidMount(el: HTMLElement, callback: () => void) {
    const observer = new MutationObserver(() => {
        if (document.body.contains(el)) {
            observer.disconnect();
            callback();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}