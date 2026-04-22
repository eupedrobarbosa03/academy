import { sectionCloseAllAddOfCategory } from "./utils.js";

class Student {};

class Section {
    constructor() {};

    showBoxActionInformation() {
        const boxStudent = document.querySelectorAll<HTMLDivElement>(".box-student");
        const events = ["mouseover", "mouseout"]
        const iconsButtons = ["icon-remove-student", "icon-edit-student"];
        const containerInformations = [
            "information-action-remove-student",
            "information-action-edit-student"
        ];
        boxStudent.forEach((box) => events.forEach((typeEvent) => {
            box.addEventListener(typeEvent, (e) => {
                const target = e.target as HTMLDivElement;
                iconsButtons.forEach((button) => {
                    if (target.classList.contains(button)) {
                        const indexInformation = containerInformations.findIndex((information) => information.includes(`${button.split("-")[1]}`));
                        const indexTarget = target.closest(".box-student") as HTMLDivElement;
                        const indexQuery = indexTarget.querySelector(`.${containerInformations[indexInformation]}`) as HTMLDivElement;
                        indexQuery.classList.toggle("show")
                    };
                });
            });
        }))
    };

    openSectionAddWorkouts() {
        const buttonAddWStudents = document.querySelector(".button-to-register-students") as HTMLButtonElement;

        buttonAddWStudents.addEventListener("click", () => {
            const sectionAddWorkouts = document.querySelector("#section-container-addition-students") as HTMLDivElement;
            sectionAddWorkouts.classList.add("show")
        });
    };

    closeSectionAddOfCategory() {
        sectionCloseAllAddOfCategory();
    };

}

const section = new Section();

export class Students {
    static actions() {
        section.showBoxActionInformation();
        section.openSectionAddWorkouts();
        section.closeSectionAddOfCategory();
    };
}