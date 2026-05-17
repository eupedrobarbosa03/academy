if (!localStorage.getItem("theme-academy"))
    localStorage.setItem("theme-academy", "light");
export class Theme {
    buttonChangeTheme;
    iconChangeTheme;
    academyIcon;
    constructor() {
        this.buttonChangeTheme = document.querySelector("[data-change-theme]");
        this.iconChangeTheme = document.querySelector("#icon-change-theme");
        this.academyIcon = document.querySelector("#icon-academy");
    }
    ;
    dark() {
        document.body.classList.add("theme");
        localStorage.setItem("theme-academy", "dark");
        this.iconChangeTheme.removeAttribute("class");
        this.iconChangeTheme.setAttribute("class", "fa-solid fa-sun sun");
        this.academyIcon.src = `assets/icons/academy_icon_light.png`;
    }
    ;
    light() {
        document.body.classList.remove("theme");
        localStorage.setItem("theme-academy", "light");
        this.iconChangeTheme.removeAttribute("class");
        this.iconChangeTheme.setAttribute("class", "fa-solid fa-moon moon");
        this.academyIcon.src = `assets/icons/academy_icon_dark.png`;
    }
    ;
    storage() {
        const getTheme = localStorage.getItem("theme-academy");
        if (!getTheme)
            return;
        getTheme === "dark" ? this.dark() : this.light();
        return getTheme;
    }
    ;
    change() {
        this.buttonChangeTheme.addEventListener("click", () => {
            this.storage() === "light" ? this.dark() : this.light();
        });
    }
}
;
export const theme = new Theme();
