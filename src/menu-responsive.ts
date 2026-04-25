class Menu {
    private menu: HTMLDivElement;
    private navbar: HTMLDivElement;
    private buttonsOption;
    constructor() {
        this.menu = document.querySelector("#menu-navbar") as HTMLDivElement;
        this.navbar = document.querySelector(".navbar-container-options") as HTMLDivElement;
        this.buttonsOption = document.querySelectorAll<HTMLButtonElement>(".button-option");
    };

    responsive() {
        this.menu.addEventListener("click", () => this.navbar.classList.toggle("show"));
        this.buttonsOption.forEach((button) => button.addEventListener("click", (e) => {
            if (this.navbar.classList.contains("show")) this.navbar.classList.remove("show");
        }));
    };

};

export const menu = new Menu();
