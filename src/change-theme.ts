if (!localStorage.getItem("theme-academy")) localStorage.setItem("theme-academy", "light");

type Element = HTMLDivElement | HTMLImageElement | HTMLParagraphElement | HTMLBodyElement;

class Theme {
    private listElements;
    private buttonChangeTheme;
    private iconChangeTheme;
    private academyIcon;
    constructor() {
        this.listElements = document.querySelectorAll<Element>(".element-theme");
        this.buttonChangeTheme = document.querySelector("[data-change-theme]") as HTMLDivElement;
        this.iconChangeTheme = document.querySelector("#icon-change-theme") as HTMLDivElement;
        this.academyIcon = document.querySelector("#icon-academy") as HTMLImageElement;
    };

    private dark() {
        localStorage.setItem("theme-academy", "dark");
        this.iconChangeTheme.removeAttribute("class");
        this.iconChangeTheme.setAttribute("class", "fa-solid fa-sun sun");
        this.academyIcon.src = `assets/icons/academy_icon_light.png`;
        this.listElements.forEach((element) => element.classList.add("theme"))
    };

    private light() {
        localStorage.setItem("theme-academy", "light");
        this.iconChangeTheme.removeAttribute("class");
        this.iconChangeTheme.setAttribute("class", "fa-solid fa-moon moon");
        this.academyIcon.src = `assets/icons/academy_icon_dark.png`;
        this.listElements.forEach((element) => element.classList.remove("theme"))
    };

    storage() {
        const getTheme = localStorage.getItem("theme-academy");
        if (!getTheme) return;
        getTheme === "dark" ? this.dark() : this.light();
        return getTheme;
    };

    change() {
        this.buttonChangeTheme.addEventListener("click", () => {
            this.storage() === "light" ? this.dark() : this.light();
        });
    }

};

export const theme = new Theme();