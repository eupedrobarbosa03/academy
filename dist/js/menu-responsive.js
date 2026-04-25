class Menu {
    menu;
    navbar;
    buttonsOption;
    constructor() {
        this.menu = document.querySelector("#menu-navbar");
        this.navbar = document.querySelector(".navbar-container-options");
        this.buttonsOption = document.querySelectorAll(".button-option");
    }
    ;
    responsive() {
        this.menu.addEventListener("click", () => this.navbar.classList.toggle("show"));
        this.buttonsOption.forEach((button) => button.addEventListener("click", (e) => {
            if (this.navbar.classList.contains("show"))
                this.navbar.classList.remove("show");
        }));
    }
    ;
}
;
export const menu = new Menu();
