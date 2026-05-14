import { dashboard } from "./dashboard.js";
import { academyRegex } from "./regex.js";
import { storage } from "./storage.js";
import { Utils } from "./utils.js";
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
    inputName;
    inputCPF;
    inputTelephone;
    inputSpecialty;
    constructor() {
        this.boxInstructor = document.querySelectorAll(".box-instructor");
        this.inputName = document.querySelector("#input-instructor-name-register");
        this.inputCPF = document.querySelector("#input-instructor-cpf-register");
        this.inputTelephone = document.querySelector("#input-instructor-telephone-register");
        this.inputSpecialty = document.querySelector("#input-instructor-specialty-register");
    }
    ;
    validations() {
        return {
            name: () => {
                if (!this.inputName.value.match(academyRegex.name)) {
                    return Utils.showError("message-error-name-instructor", this.inputName.id, `Nome inválido. Tente novamente...`);
                }
                ;
                Utils.hideError();
                return true;
            },
            cpf: () => {
                if (!this.inputCPF.value.match(academyRegex.cpf)) {
                    return Utils.showError("message-error-cpf-instructor", this.inputCPF.id, `CPF inválido. Verifique o formato.`);
                }
                ;
                const instructors = storage.get("instructors");
                if (!instructors)
                    return null;
                const existingCFP = instructors.find((instructor) => instructor.cpf === this.inputCPF.value);
                if (existingCFP)
                    return Utils.showError("message-error-cpf-instructor", this.inputCPF.id, "O CPF informado está em uso.");
                Utils.hideError();
                if (!this.inputCPF.value.includes("-")) {
                    const format = `${this.inputCPF.value.slice(0, 3)}.${this.inputCPF.value.slice(3, 6)}.${this.inputCPF.value.slice(6, 9)}-${this.inputCPF.value.slice(9, 11)}`;
                    this.inputCPF.value = format;
                }
                return true;
            }
        };
    }
    create() {
        const listInstructors = document.querySelector("#list-instructors");
        const buttonRegister = document.querySelector(".button-save-register-instructor");
        this.inputName.addEventListener("input", () => {
            this.validations().name();
        });
        this.inputCPF.addEventListener("input", () => {
            this.validations().cpf();
        });
        buttonRegister.addEventListener("click", () => {
            if (!this.validations().name() ||
                !this.validations().cpf())
                return;
        });
    }
    ;
    edit() {
        this.boxInstructor.forEach((box) => document.body.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("icon-edit-instructor")) {
                const indexTarget = target.closest(".box-instructor");
                if (!indexTarget)
                    return;
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
        instructor.create();
        instructor.edit();
        instructor.delete();
    }
    ;
}
