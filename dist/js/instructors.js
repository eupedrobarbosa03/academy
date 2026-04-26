import { dashboard } from "./dashboard.js";
class Section {
    constructor() { }
    ;
    static showBoxActionInformation() {
        const boxWorkout = document.querySelectorAll(".box-instructor");
        const events = ["mouseover", "mouseout"];
        const iconsButtons = ["icon-remove-instructor", "icon-edit-instructor"];
        const containerInformations = [
            "information-action-remove-instructor",
            "information-action-edit-instructor"
        ];
        boxWorkout.forEach((workout) => events.forEach((typeEvent) => {
            document.body.addEventListener(typeEvent, (e) => {
                const target = e.target;
                iconsButtons.forEach((button) => {
                    if (target.classList.contains(button)) {
                        const indexInformation = containerInformations.findIndex((information) => information.includes(`${button.split("-")[1]}`));
                        const indexTarget = target.closest(".box-instructor");
                        const indexQuery = indexTarget.querySelector(`.${containerInformations[indexInformation]}`);
                        indexQuery.classList.toggle("show");
                    }
                    ;
                });
            });
        }));
    }
    ;
    static openSectionAddInstructors() {
        const buttonAddWStudents = document.querySelector(".button-to-register-instructors");
        buttonAddWStudents.addEventListener("click", () => {
            const sectionAddWorkouts = document.querySelector("#section-container-addition-instructors");
            sectionAddWorkouts.classList.add("show");
        });
    }
    ;
    static openSectionEditStudents() {
        const sectionEditInstructors = document.querySelector("#section-container-edit-instructors");
        const boxInstructor = document.querySelectorAll(".box-instructor");
        boxInstructor.forEach((box) => document.body.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("icon-edit-instructor")) {
                const indexTarget = target.closest(".box-instructor");
                if (!indexTarget)
                    return;
                sectionEditInstructors.classList.add("show");
            }
        }));
    }
    ;
}
;
class Instructor {
    boxInstructor;
    ;
    constructor() {
        this.boxInstructor = document.querySelectorAll(".box-instructor");
    }
    ;
    edit() {
        this.boxInstructor.forEach((box) => document.body.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("icon-edit-instructor")) {
                const indexTarget = target.closest(".box-instructor");
                if (!indexTarget)
                    return;
                const inputName = document.getElementById("input-instructor-name-edit");
                const inputCPF = document.querySelector("#input-instructor-cpf-edit");
                const inputTelephone = document.querySelector("#input-instructor-telephone-edit");
                inputName.value = 'Alessandro';
                inputCPF.value = '123.456.789.10';
                inputTelephone.value = "(61) 99131-3359";
            }
        }));
    }
    ;
    delete() {
        this.boxInstructor.forEach((box) => document.body.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("icon-remove-instructor")) {
                const indexTarget = target.closest(".box-instructor");
                if (!indexTarget)
                    return;
                indexTarget.remove();
                dashboard.update("delete").instructors();
            }
        }));
    }
    ;
}
;
const instructor = new Instructor();
export class Instructors {
    static actions() {
        Section.showBoxActionInformation();
        Section.openSectionAddInstructors();
        Section.openSectionEditStudents();
        instructor.edit();
        instructor.delete();
    }
    ;
}
