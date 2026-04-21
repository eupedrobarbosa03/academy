if (!localStorage.getItem("theme-academy"))
    localStorage.setItem("theme-academy", "light");
const buttonChangeTheme = document.querySelector("[data-change-theme]");
const iconChangeTheme = document.querySelector("#icon-change-theme");
const academyIcon = document.querySelector("#icon-academy");
const listElements = {
    containerBoxInformation: document.querySelectorAll(".box-information"),
    buttonOption: document.querySelectorAll(".button-option"),
    boxInformation: document.querySelectorAll(".box-information h2"),
    boxWorkout: document.querySelectorAll(".box-workout"),
    exitTheSection: document.querySelectorAll(".exit-the-section"),
    inputSearchWorkouts: document.querySelectorAll("#input-search-workouts"),
    boxContainerInput: document.querySelectorAll(".box-container-input input"),
    boxContainerLabel: document.querySelectorAll(".box-container-input label")
};
const singleElements = {
    body: document.body,
    headerContainer: document.querySelector(".header-container-academy"),
    academyTitle: document.querySelector(".title-container h2"),
    user: document.querySelector(".user"),
    navbarContainer: document.querySelector(".navbar-container-options"),
    menu: document.querySelector("#menu-navbar"),
    sectionAdditionWorkouts: document.querySelector(".section-container-addition-items")
};
class Theme {
    constructor() { }
    ;
    dark() {
        localStorage.setItem("theme-academy", "dark");
        iconChangeTheme.removeAttribute("class");
        iconChangeTheme.setAttribute("class", "fa-solid fa-sun sun");
        academyIcon.src = `assets/icons/academy_icon_light.png`;
        Object.values(singleElements).forEach((singleElement) => singleElement.classList.add("theme"));
        for (let i = 0; i < Object.values(listElements).length; i++) {
            const elements = [...Object.values(listElements)[i]];
            elements.forEach((element) => element.classList.add("theme"));
        }
        ;
    }
    ;
    light() {
        localStorage.setItem("theme-academy", "light");
        iconChangeTheme.removeAttribute("class");
        iconChangeTheme.setAttribute("class", "fa-solid fa-moon moon");
        academyIcon.src = `assets/icons/academy_icon_dark.png`;
        Object.values(singleElements).forEach((singleElement) => singleElement.classList.remove("theme"));
        for (let i = 0; i < Object.values(listElements).length; i++) {
            const elements = [...Object.values(listElements)[i]];
            elements.forEach((element) => element.classList.remove("theme"));
        }
        ;
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
}
;
export function changeTheme() {
    const theme = new Theme();
    theme.storage();
    buttonChangeTheme.addEventListener("click", () => {
        theme.storage() === "light" ? theme.dark() : theme.light();
    });
}
