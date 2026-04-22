import { sectionCloseAllAddOfCategory } from "./utils.js";
class Workout {
}
;
class Section {
    constructor() { }
    ;
    showBoxActionInformation() {
        const boxWorkout = document.querySelectorAll(".box-workout");
        const events = ["mouseover", "mouseout"];
        const iconsButtons = ["icon-cancel-workout", "icon-check-workout"];
        const containerInformations = [
            "information-action-check",
            "information-action-cancel"
        ];
        boxWorkout.forEach((workout) => events.forEach((typeEvent) => {
            workout.addEventListener(typeEvent, (e) => {
                const target = e.target;
                iconsButtons.forEach((button) => {
                    if (target.classList.contains(button)) {
                        const indexInformation = containerInformations.findIndex((information) => information.includes(`${button.split("-")[1]}`));
                        const indexTarget = target.closest(".box-workout");
                        const indexQuery = indexTarget.querySelector(`.${containerInformations[indexInformation]}`);
                        indexQuery.classList.toggle("show");
                    }
                    ;
                });
            });
        }));
    }
    ;
    openSectionAddWorkouts() {
        const buttonAddWorkouts = document.querySelector(".button-to-mark-workouts");
        buttonAddWorkouts.addEventListener("click", () => {
            const sectionAddWorkouts = document.querySelector("#section-container-addition-workouts");
            sectionAddWorkouts.classList.add("show");
        });
    }
    ;
    closeSectionAddOfCategory() {
        sectionCloseAllAddOfCategory();
    }
}
;
const section = new Section();
export class Workouts {
    static actions() {
        section.openSectionAddWorkouts();
        section.closeSectionAddOfCategory();
        section.showBoxActionInformation();
    }
    ;
}
;
