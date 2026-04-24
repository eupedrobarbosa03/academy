import { section } from "./change-section.js";
import { Theme, theme } from "./change-theme.js";
import { menu } from "./menu-responsive.js";
import { Students } from "./students.js";
import { Workouts } from "./workouts.js";
import { Instructors } from "./instructors.js";
import { sectionCloseAllActionsOfCategory } from "./utils.js";
section.change();
menu.responsive();
theme.change();
theme.storage();
Workouts.actions();
Students.actions();
Instructors.actions();
sectionCloseAllActionsOfCategory();
window.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const containerInformationsWorkouts = document.querySelector(".container-informations-workouts");
        const paragraph = document.createElement("p");
        paragraph.classList.add("element-theme");
        paragraph.innerText = `Teste: `;
        const spanInformationWorkout = document.createElement("span");
        spanInformationWorkout.classList.add("informations-workouts-box-workout");
        spanInformationWorkout.classList.add("element-theme");
        spanInformationWorkout.innerText = "Teste 123";
        containerInformationsWorkouts.appendChild(paragraph);
        paragraph.appendChild(spanInformationWorkout);
        theme.changeForNewElements("container-informations-workouts p", "all");
        theme.changeForNewElements("container-informations-workouts p span", "all");
    }
});
const buttonChangeTheme = document.querySelector("[data-change-theme]");
buttonChangeTheme.addEventListener("click", () => {
    theme.changeForNewElements("container-informations-workouts p", "all");
    theme.changeForNewElements("container-informations-workouts p span", "all");
});
