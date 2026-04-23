class Section {
    constructor() { }
    ;
    showBoxActionInformation() {
        const boxWorkout = document.querySelectorAll(".box-instructor");
        const events = ["mouseover", "mouseout"];
        const iconsButtons = ["icon-remove-instructor", "icon-edit-instructor"];
        const containerInformations = [
            "information-action-remove-instructor",
            "information-action-edit-instructor"
        ];
        boxWorkout.forEach((workout) => events.forEach((typeEvent) => {
            workout.addEventListener(typeEvent, (e) => {
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
    openSectionAddInstructors() {
        const buttonAddWStudents = document.querySelector(".button-to-register-instructors");
        buttonAddWStudents.addEventListener("click", () => {
            const sectionAddWorkouts = document.querySelector("#section-container-addition-instructors");
            sectionAddWorkouts.classList.add("show");
        });
    }
    ;
    openSectionEditStudents() {
        const iconButtonEditInstructor = document.querySelectorAll(".icon-edit-instructor");
        const sectionEditInstructor = document.querySelector("#section-container-edit-instructors");
        iconButtonEditInstructor.forEach((button) => button.addEventListener("click", () => {
            sectionEditInstructor.classList.add("show");
        }));
    }
    ;
}
;
class Instructor {
    constructor() { }
    ;
    edit() {
        const boxInstructor = document.querySelectorAll(".box-instructor");
        boxInstructor.forEach((box) => box.addEventListener("click", (e) => {
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
}
;
const section = new Section();
const instructor = new Instructor();
export class Instructors {
    static actions() {
        section.showBoxActionInformation();
        section.openSectionAddInstructors();
        section.openSectionEditStudents();
        instructor.edit();
    }
    ;
}
