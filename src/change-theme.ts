if (!localStorage.getItem("theme-academy")) localStorage.setItem("theme-academy", "light");
const changeTheme = document.querySelector("[data-change-theme]") as HTMLButtonElement;
const iconChangeTheme = document.querySelector("#icon-change-theme") as HTMLDivElement;
const academyIcon = document.querySelector("#icon-academy") as HTMLImageElement;

const listElements: Record<string, any> = {
    boxInformation: document.querySelectorAll<HTMLDivElement>(".box-information")
};


const singleElements: Record<string, HTMLElement> = {
    body: document.body,
    headerContainer: document.querySelector(".header-container-academy") as HTMLDivElement,
    academyTitle: document.querySelector(".title-container h2") as HTMLDivElement,
    user: document.querySelector(".user") as HTMLParagraphElement
};

class Theme {
    constructor() {};


    dark() {
        localStorage.setItem("theme-academy", "dark");
        iconChangeTheme.removeAttribute("class");
        iconChangeTheme.setAttribute("class", "fa-solid fa-sun sun");
        academyIcon.src = `assets/icons/academy_icon_light.png`;
        Object.values(singleElements).forEach((singleElement) =>
            singleElement.classList.add("theme"));
        for (let i = 0; i < Object.values(listElements).length; i++) {
            const elements = [...Object.values(listElements)[i]];
            elements.forEach((element) => element.classList.add("theme"));
        };
    };

    light() {
        localStorage.setItem("theme-academy", "light");
        iconChangeTheme.removeAttribute("class");
        iconChangeTheme.setAttribute("class", "fa-solid fa-moon moon");
        academyIcon.src = `assets/icons/academy_icon_dark.png`;
        Object.values(singleElements).forEach((singleElement) =>
            singleElement.classList.remove("theme"));
        for (let i = 0; i < Object.values(listElements).length; i++) {
            const elements = [...Object.values(listElements)[i]];
            elements.forEach((element) => element.classList.remove("theme"));
        };
    };

    storage() {
        const getTheme = localStorage.getItem("theme-academy");
        if (!getTheme) return;
        getTheme === "dark" ? this.dark() : this.light();
        return getTheme;
    };

};

const theme = new Theme();

changeTheme.addEventListener("click", () => {
    theme.storage() === "light" ? theme.dark() : theme.light();
});

