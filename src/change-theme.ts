if (!localStorage.getItem("theme-academy")) localStorage.setItem("theme-academy", "light");
const buttonChangeTheme = document.querySelector("[data-change-theme]") as HTMLButtonElement;
const iconChangeTheme = document.querySelector("#icon-change-theme") as HTMLDivElement;
const academyIcon = document.querySelector("#icon-academy") as HTMLImageElement;

type Element = HTMLDivElement | HTMLInputElement | HTMLParagraphElement
const listElements = document.querySelectorAll<Element>(".element-theme")

class Theme {
    constructor() {};

    dark() {
        localStorage.setItem("theme-academy", "dark");
        iconChangeTheme.removeAttribute("class");
        iconChangeTheme.setAttribute("class", "fa-solid fa-sun sun");
        academyIcon.src = `assets/icons/academy_icon_light.png`;
        listElements.forEach((element) => element.classList.add("theme"))
    };

    light() {
        localStorage.setItem("theme-academy", "light");
        iconChangeTheme.removeAttribute("class");
        iconChangeTheme.setAttribute("class", "fa-solid fa-moon moon");
        academyIcon.src = `assets/icons/academy_icon_dark.png`;
        listElements.forEach((element) => element.classList.remove("theme"))
    };

    storage() {
        const getTheme = localStorage.getItem("theme-academy");
        if (!getTheme) return;
        getTheme === "dark" ? this.dark() : this.light();
        return getTheme;
    };

};

export function changeTheme() {
    const theme = new Theme();
    theme.storage();

    buttonChangeTheme.addEventListener("click", () => {
        theme.storage() === "light" ? theme.dark() : theme.light();
    });
}

