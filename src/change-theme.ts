if (!localStorage.getItem("theme-academy")) localStorage.setItem("theme-academy", "light");
const buttonChangeTheme = document.querySelector("[data-change-theme]") as HTMLButtonElement;
const iconChangeTheme = document.querySelector("#icon-change-theme") as HTMLDivElement;
const academyIcon = document.querySelector("#icon-academy") as HTMLImageElement;

const listElements: Record<string, any> = {
    containerBoxInformation: document.querySelectorAll<HTMLDivElement>(".box-information"),
    buttonOption: document.querySelectorAll<HTMLButtonElement>(".button-option"),
    boxInformation: document.querySelectorAll<HTMLDivElement>(".box-information h2"),
    boxWorkout: document.querySelectorAll<HTMLDivElement>(".box-workout"),
    exitTheSection: document.querySelectorAll<HTMLDivElement>(".exit-the-section"),
    inputSearchWorkouts: document.querySelectorAll<HTMLInputElement>("#input-search-workouts"),
    boxContainerInput: document.querySelectorAll<HTMLInputElement>(".box-container-input input"),
    boxContainerLabel: document.querySelectorAll<HTMLLabelElement>(".box-container-input label")
};

const singleElements: Record<string, HTMLElement> = {
    body: document.body,
    headerContainer: document.querySelector(".header-container-academy") as HTMLDivElement,
    academyTitle: document.querySelector(".title-container h2") as HTMLDivElement,
    user: document.querySelector(".user") as HTMLParagraphElement,
    navbarContainer: document.querySelector(".navbar-container-options") as HTMLDivElement,
    menu: document.querySelector("#menu-navbar") as HTMLDivElement,
    sectionAdditionWorkouts: document.querySelector(".section-container-addition-items") as HTMLDivElement
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

export function changeTheme() {
    const theme = new Theme();
    theme.storage();

    buttonChangeTheme.addEventListener("click", () => {
        theme.storage() === "light" ? theme.dark() : theme.light();
    });
}

