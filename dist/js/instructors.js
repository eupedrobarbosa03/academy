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
    instructors;
    constructor() {
        this.boxInstructor = document.querySelectorAll(".box-instructor");
        this.inputName = document.querySelector("#input-instructor-name-register");
        this.inputCPF = document.querySelector("#input-instructor-cpf-register");
        this.inputTelephone = document.querySelector("#input-instructor-telephone-register");
        this.inputSpecialty = document.querySelector("#input-instructor-specialty-register");
        this.instructors = storage.get("instructors");
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
                if (!this.instructors)
                    return null;
                if (!this.inputCPF.value.includes("-")) {
                    const format = `${this.inputCPF.value.slice(0, 3)}.${this.inputCPF.value.slice(3, 6)}.${this.inputCPF.value.slice(6, 9)}-${this.inputCPF.value.slice(9, 11)}`;
                    this.inputCPF.value = format;
                }
                ;
                const existingCFP = this.instructors.find((instructor) => instructor.cpf === this.inputCPF.value);
                if (existingCFP)
                    return Utils.showError("message-error-cpf-instructor", this.inputCPF.id, "O CPF informado está em uso.");
                Utils.hideError();
                return true;
            },
            telephone: () => {
                if (!this.inputTelephone.value.match(academyRegex.telephone)) {
                    return Utils.showError("message-error-telephone-instructor", this.inputTelephone.id, "Número de telefone inválido.");
                }
                Utils.hideError();
                if (!this.instructors)
                    return null;
                const existingTelephone = this.instructors.find((instructor) => instructor.telephone === this.inputTelephone.value);
                if (existingTelephone)
                    return Utils.showError("message-error-telephone-instructor", this.inputTelephone.id, "O telefone informado está em uso.");
                Utils.hideError();
                return true;
            },
            specialty: () => {
                if (!this.inputSpecialty.value.match(academyRegex.specialty)) {
                    return Utils.showError("message-error-specialty-instructor", this.inputSpecialty.id, "Nome da especialidade inválido. Tente novamante...");
                }
                Utils.hideError();
                return true;
            }
        };
    }
    create() {
        const buttonRegister = document.querySelector(".button-save-register-instructor");
        this.inputName.addEventListener("input", () => {
            this.validations().name();
        });
        this.inputCPF.addEventListener("input", () => {
            this.validations().cpf();
        });
        this.inputTelephone.addEventListener("input", () => {
            this.validations().telephone();
        });
        this.inputSpecialty.addEventListener("input", () => {
            this.validations().specialty();
        });
        buttonRegister.addEventListener("click", () => {
            if (!this.validations().name() || !this.validations().cpf() || !this.validations().telephone() || !this.validations().specialty())
                return;
            const optionsListInstructors = document.querySelector("#list-instructors");
            const option = document.createElement("option");
            option.textContent = this.inputName.value;
            optionsListInstructors.appendChild(option);
            const instructorsDOM = document.querySelector(".instructors");
            const box = document.createElement("div");
            box.classList.add("box-instructor");
            box.innerHTML =
                `
                <div class="container-informations-instructors">
                    <p class="">
                        Instrutor:
                        <span class="informations-instructors-box-instructor">${this.inputName.value}</span>
                    </p>
                    <p class="">
                        CPF:
                        <span class="informations-instructors-box-instructor info-cpf-instructor">${this.inputCPF.value}</span>
                    </p>
                    <p class="">
                        Telefone
                        <span class="informations-instructors-box-instructor">${this.inputTelephone.value}</span>
                    </p>
                    <p class="">
                        Especialidade
                        <span class="informations-instructors-box-instructor">${this.inputSpecialty.value}</span>
                    </p>
                    <p class="">
                        Status
                        <span class="informations-instructors-box-instructor">Ativo</span>
                    </p>
                </div>
                <div class="container-actions-box-instructors">
                    <i class="fa-solid fa-pen-to-square icon-edit-instructor"></i>
                    <i class="fa-solid fa-trash icon-remove-instructor"></i>
                    <div class="information-action-edit-instructor information-action">
                        <p class="">Editar</p>
                    </div>
                    <div class="information-action-remove-instructor information-action">
                        <p class="">Remover</p>
                    </div>
                </div>
            `;
            instructorsDOM.appendChild(box);
            storage.add({
                name: this.inputName.value,
                cpf: this.inputCPF.value,
                telephone: this.inputTelephone.value,
                specialty: this.inputSpecialty.value
            }, "instructors");
            Utils.clearnInputs();
            alert(`Instrutor adicionado com sucesso!`);
            dashboard.update("create").instructors();
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
        instructor.create();
        instructor.edit();
        instructor.delete();
        Section.showBoxActionInformation();
        Section.openSectionAddInstructors();
        Section.openSectionEditStudents();
    }
    ;
}
