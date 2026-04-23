class Menu {
    menu;
    navbar;
    constructor() {
        this.menu = document.querySelector("#menu-navbar");
        this.navbar = document.querySelector(".navbar-container-options");
    }
    ;
    responsive() {
        this.menu.addEventListener("click", () => this.navbar.classList.toggle("show"));
    }
    ;
}
;
export const menu = new Menu();
