import { sectionCloseAllAddOfCategory } from "./utils.js";
class Student {
}
;
class Section {
    constructor() { }
    ;
    showBoxActionInformation() {
        const boxStudent = document.querySelectorAll(".box-student");
        const events = ["mouseover", "mouseout"];
        const iconsButtons = ["icon-remove-student", "icon-edit-student"];
        const containerInformations = [
            "information-action-remove-student",
            "information-action-edit-student"
        ];
        boxStudent.forEach((box) => events.forEach((typeEvent) => {
            box.addEventListener(typeEvent, (e) => {
                const target = e.target;
                iconsButtons.forEach((button) => {
                    if (target.classList.contains(button)) {
                        const indexInformation = containerInformations.findIndex((information) => information.includes(`${button.split("-")[1]}`));
                        const indexTarget = target.closest(".box-student");
                        const indexQuery = indexTarget.querySelector(`.${containerInformations[indexInformation]}`);
                        indexQuery.classList.toggle("show");
                    }
                    ;
                });
            });
        }));
    }
    ;
    openSectionAddStudents() {
        const buttonAddWStudents = document.querySelector(".button-to-register-students");
        buttonAddWStudents.addEventListener("click", () => {
            const sectionAddWorkouts = document.querySelector("#section-container-addition-students");
            sectionAddWorkouts.classList.add("show");
        });
    }
    ;
    closeSectionAddStudents() {
        sectionCloseAllAddOfCategory();
    }
    ;
}
const section = new Section();
export class Students {
    static actions() {
        section.showBoxActionInformation();
        section.openSectionAddStudents();
        section.closeSectionAddStudents();
    }
    ;
}
