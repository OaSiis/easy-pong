export function DashboardPage(): { render(): HTMLElement } {

    function render(): HTMLElement {

        const el = document.createElement("div");

        const title = document.createElement("h1");
        title.textContent = "Tableau de bord";  

        el.appendChild(title);

        return el;
    }

    return { render };
}