export function PrivateLayout(children: HTMLElement): HTMLElement {
    const el = document.createElement("div");
    el.className = "public-layout";

    const main = document.createElement("main");
    main.className = "public-main";
    main.textContent = "Public Main Content";

    const footer = document.createElement("footer");
    footer.className = "public-footer";
    footer.textContent = "Public Footer";

    el.appendChild(children);
    el.appendChild(footer);

    return el;
}