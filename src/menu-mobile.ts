class Menu {
    private menu: HTMLDivElement;
    private navbar: HTMLDivElement;
    constructor() {
        this.menu = document.querySelector("#menu-navbar") as HTMLDivElement;
        this.navbar = document.querySelector(".navbar-container-options") as HTMLDivElement;
    };

    mobile() {
        this.menu.addEventListener("click", () => this.navbar.classList.toggle("show"));
    };
};

export const menu = new Menu();
