import { sectionCloseAllAddOfCategory } from "./utils.js";

class Instructor {};

class Section {
    constructor() {};

    showBoxActionInformation() {
        const boxWorkout = document.querySelectorAll<HTMLDivElement>(".box-instructor");
        const events = ["mouseover", "mouseout"];
        const iconsButtons = ["icon-remove-instructor", "icon-edit-instructor"];
        const containerInformations = [
            "information-action-remove-instructor",
            "information-action-edit-instructor"
        ];

        boxWorkout.forEach((workout) => events.forEach((typeEvent) => {
            workout.addEventListener(typeEvent, (e) => {
                const target = e.target as HTMLDivElement;
                iconsButtons.forEach((button) => {
                    if (target.classList.contains(button)) {
                        const indexInformation = containerInformations.findIndex((information) => information.includes(`${button.split("-")[1]}`));
                        const indexTarget = target.closest(".box-instructor") as HTMLDivElement;
                        const indexQuery = indexTarget.querySelector(`.${containerInformations[indexInformation]}`) as HTMLDivElement;
                        indexQuery.classList.toggle("show")
                    };
                }) 
            })
        }))
    };

    openSectionAddInstructors() {
        const buttonAddWStudents = document.querySelector(".button-to-register-instructors") as HTMLButtonElement;

        buttonAddWStudents.addEventListener("click", () => {
            const sectionAddWorkouts = document.querySelector("#section-container-addition-instructors") as HTMLDivElement;
            sectionAddWorkouts.classList.add("show")
        });
    };

    closeSectionAddInstructors() {
        sectionCloseAllAddOfCategory();
    };
};

const section = new Section();

export class Instructors {
    static actions() {
        section.showBoxActionInformation();
        section.openSectionAddInstructors();
        section.closeSectionAddInstructors();
    };
}