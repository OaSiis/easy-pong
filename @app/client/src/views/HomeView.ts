export function HomeView(): { render(): HTMLElement } {

    function render(): HTMLElement {
        const el = document.createElement("div");

        const title = document.createElement("h1");
        title.textContent = "Accueil Public";

        const link = document.createElement("a");
        link.href = "/login";
        link.textContent = "Se connecter";

        el.appendChild(title);
        el.appendChild(link);
        return el;
    }

    return { render };
}