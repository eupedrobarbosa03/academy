import { dashboard } from "./dashboard.js";
import { academyRegex } from "./regex.js";
import { Utils } from "./utils.js";

class Section {
    constructor() {};

    static showBoxActionInformation() {
        const boxWorkout = document.querySelectorAll<HTMLDivElement>(".box-instructor");
        const events = ["mouseover", "mouseout"];
        const iconsButtons = ["icon-remove-instructor", "icon-edit-instructor"];
        const containerInformations = [
            "information-action-remove-instructor",
            "information-action-edit-instructor"
        ];

        boxWorkout.forEach((workout) => events.forEach((typeEvent) => {
            document.body.addEventListener(typeEvent, (e) => {
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

    static openSectionAddInstructors() {
        const buttonAddWStudents = document.querySelector(".button-to-register-instructors") as HTMLButtonElement;

        buttonAddWStudents.addEventListener("click", () => {
            const sectionAddWorkouts = document.querySelector("#section-container-addition-instructors") as HTMLDivElement;
            sectionAddWorkouts.classList.add("show")
        });
    };

    static openSectionEditStudents() {
        const sectionEditInstructors = document.querySelector("#section-container-edit-instructors") as HTMLDivElement;
        const boxInstructor = document.querySelectorAll<HTMLDivElement>(".box-instructor");
        boxInstructor.forEach((box) => document.body.addEventListener("click", (e) => {
            const target = e.target as HTMLDivElement;
            if (target.classList.contains("icon-edit-instructor")) {
                const indexTarget = target.closest(".box-instructor");
                if (!indexTarget) return;
                sectionEditInstructors.classList.add("show");
            }
        }));
    };


};

class Instructor {
    private boxInstructor;;
    constructor() {
        this.boxInstructor = document.querySelectorAll<HTMLDivElement>(".box-instructor");
    };

    create() {
        const listInstructors = document.querySelector("#list-instructors") as HTMLSelectElement
        const buttonRegister = document.querySelector(".button-save-register-instructor") as HTMLDivElement;
        const inputName = document.querySelector("#input-instructor-name-register") as HTMLInputElement;
        const inputCPF = document.querySelector("#input-instructor-cpf-register") as HTMLInputElement;
        const inputTelephone = document.querySelector("#input-instructor-telephone-register") as HTMLInputElement;
        const inputSpecialty = document.querySelector("#input-instructor-specialty-register") as HTMLInputElement;

        buttonRegister.addEventListener("click", () => {
            if (!inputName.value.match(academyRegex.name)) {
                return Utils.showError(
                    "message-error-name-instructor",
                    inputName.id,
                    `Nome inválido. Tente novamente...`
                );  
            };
            Utils.hideError()
        });


    };
    
    edit() {
        this.boxInstructor.forEach((box) => document.body.addEventListener("click", (e) => {
            const target = e.target as HTMLDivElement;
            if (target.classList.contains("icon-edit-instructor")) {
                const indexTarget = target.closest(".box-instructor");
                if (!indexTarget) return;
            }

        }))
    };

    delete() {
        this.boxInstructor.forEach((box) => document.body.addEventListener("click", (e) => {
            const target = e.target as HTMLDivElement;
            if (target.classList.contains("icon-remove-instructor")) {
                const indexTarget = target.closest(".box-instructor");
                if (!indexTarget) return;
                indexTarget.remove();
                dashboard.update("delete").instructors();
            }

        }))
    };
};

const instructor = new Instructor();

export class Instructors {
    static actions() {
        Section.showBoxActionInformation();
        Section.openSectionAddInstructors();
        Section.openSectionEditStudents();
        instructor.create();
        instructor.edit();
        instructor.delete();
    };
}