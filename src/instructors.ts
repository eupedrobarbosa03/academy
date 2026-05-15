import { dashboard } from "./dashboard.js";
import { academyRegex } from "./regex.js";
import { storage } from "./storage.js";
import { Utils } from "./utils.js";
import { InstructorType } from "./interfaces.js";
import { KeysLocalStorage } from "./storage.js";

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
                    }
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
    private boxInstructor;
    private inputName;
    private inputCPF;
    private inputTelephone;
    private inputSpecialty;
    constructor() {
        this.boxInstructor = document.querySelectorAll<HTMLDivElement>(".box-instructor");
        this.inputName = document.querySelector("#input-instructor-name-register") as HTMLInputElement;
        this.inputCPF = document.querySelector("#input-instructor-cpf-register") as HTMLInputElement;
        this.inputTelephone = document.querySelector("#input-instructor-telephone-register") as HTMLInputElement;
        this.inputSpecialty = document.querySelector("#input-instructor-specialty-register") as HTMLInputElement;
    };

    private validations(inputValue: string, className: string, id: string) {
        const instructors = storage.get<InstructorType[], KeysLocalStorage>("instructors") || [];
        return {
            name: () => {
                if (!inputValue.match(academyRegex.name)) {
                    return Utils.showError(className, id,
                        `Nome inválido. Tente novamente...`
                    );  
                };
                Utils.hideError();
                return true;
            },
            cpf: () => {

                if (!inputValue.match(academyRegex.cpf)) {
                    return Utils.showError(className, id, `CPF inválido. Verifique o formato.`
                    );  
                };
                
                if (!inputValue.includes("-")) {
                    const format = `${inputValue.slice(0, 3)}.${inputValue.slice(3, 6)}.${inputValue.slice(6, 9)}-${inputValue.slice(9, 11)}`;
                    this.inputCPF.value = format;
                };

                const existingCFP = instructors.find((instructor) =>
                    instructor.cpf === inputValue);

                if (existingCFP) return Utils.showError(className, id, "O CPF informado está em uso."
                )

                Utils.hideError();

                return true
            },
            telephone: () => {

                if (!inputValue.match(academyRegex.telephone)) {
                    return Utils.showError(className, id, "Número de telefone inválido.");
                }

                Utils.hideError();

                const existingTelephone = instructors.find((instructor) => instructor.telephone === inputValue);

                if (existingTelephone) return Utils.showError(className, id, "O telefone informado está em uso.");

                Utils.hideError();
                return true;
            },
            specialty: () => {
                if (!inputValue.match(academyRegex.specialty)) {
                    return Utils.showError(className, id, "Nome da especialidade inválido. Tente novamante...")
                }
                Utils.hideError();
                return true;
            }
        }
    }

    create() {
        const buttonRegister = document.querySelector(".button-save-register-instructor") as HTMLDivElement;

        this.inputName.addEventListener("input", () => {
            this.validations(this.inputName.value, "message-error-name-instructor", this.inputName.id).name();
        })

        this.inputCPF.addEventListener("input", () => {
            this.validations(this.inputCPF.value, "message-error-cpf-instructor", this.inputCPF.id).cpf();
        })

        this.inputTelephone.addEventListener("input", () => {
            this.validations(this.inputTelephone.value, "message-error-telephone-instructor", this.inputTelephone.id).telephone();
        })

        this.inputSpecialty.addEventListener("input", () => {
            this.validations(this.inputSpecialty.value, "message-error-specialty-instructor", this.inputSpecialty.id).specialty();
        })

        buttonRegister.addEventListener("click", () => {

            if (!this.validations(this.inputName.value, "message-error-name-instructor", this.inputName.id).name()) return;

            if (!this.validations(this.inputCPF.value, "message-error-cpf-instructor", this.inputCPF.id).cpf()) return;

            if (!this.validations(this.inputTelephone.value, "message-error-telephone-instructor", this.inputTelephone.id).telephone()) return;

            if (!this.validations(this.inputSpecialty.value, "message-error-specialty-instructor", this.inputSpecialty.id).specialty()) return;

            const optionsListInstructors = document.querySelector("#list-instructors") as HTMLSelectElement
            const option = document.createElement("option");
            option.textContent = this.inputName.value;
            optionsListInstructors.appendChild(option);

            const instructorsDOM = document.querySelector(".instructors") as HTMLDivElement;

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
                        Telefone:
                        <span class="informations-instructors-box-instructor">${this.inputTelephone.value}</span>
                    </p>
                    <p class="">
                        Especialidade:
                        <span class="informations-instructors-box-instructor">${this.inputSpecialty.value}</span>
                    </p>
                    <p class="">
                        Status:
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
            `

            instructorsDOM.appendChild(box);

            storage.add<InstructorType, "instructors">({
                name: this.inputName.value,
                cpf: this.inputCPF.value,
                telephone: this.inputTelephone.value,
                specialty: this.inputSpecialty.value
            }, "instructors");

            Utils.clearnInputs();
            alert(`Instrutor adicionado com sucesso!`);
            dashboard.update("create").instructors();

        })
    };
    
    edit() {

        const buttonSaveEdit = document.querySelector(".button-save-edit-instructor") as HTMLButtonElement;

        const inputNameEdit = document.querySelector("#input-instructor-name-edit") as HTMLInputElement;
        const inputCPFEdit = document.querySelector("#input-instructor-cpf-edit") as HTMLInputElement;
        const inputTelephoneEdit = document.querySelector("#input-instructor-telephone-edit") as HTMLInputElement;
        const inputSpecialtyEdit = document.querySelector("#input-instructor-specialty-edit") as HTMLInputElement;



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
                const instructorCPF = indexTarget.querySelector(".info-cpf-instructor") as HTMLSpanElement;

                const instructosUpdated = storage.get<InstructorType[], KeysLocalStorage>("instructors");

                if (instructosUpdated === null) return;

                const indexInstructorCPF = instructosUpdated.findIndex((instructor) =>
                    instructor.cpf === instructorCPF.textContent);
                if (indexInstructorCPF === -1) return;

                dashboard.update("delete").instructors();
                storage.delete<InstructorType, "instructors">("instructors", indexInstructorCPF)
                indexTarget.remove();

            }
        }))
    };
};

const instructor = new Instructor();

export class Instructors {
    static actions() {
        instructor.create();
        instructor.edit();
        instructor.delete();
        Section.showBoxActionInformation();
        Section.openSectionAddInstructors();
        Section.openSectionEditStudents();
    };
}