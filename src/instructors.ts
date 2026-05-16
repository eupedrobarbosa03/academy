import { dashboard } from "./dashboard.js";
import { academyRegex } from "./regex.js";
import { storage } from "./storage.js";
import { Utils } from "./utils.js";
import { InstructorType } from "./interfaces.js";
import { KeysLocalStorage } from "./storage.js";
import { Category } from "./dom-box-category-utils.js";

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
                if (!inputValue) return Utils.hideError();
                if (!inputValue.match(academyRegex.name)) {
                    return Utils.showError(className, id,
                        `Nome inválido. Tente novamente...`
                    );  
                };
                Utils.hideError();
                return true;
            },
            cpf: () => {
                if (!inputValue) return Utils.hideError();
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
            telephone: (isEdit?: boolean, valueEdit?: string) => {
                if (!inputValue) return Utils.hideError();
                if (!inputValue.match(academyRegex.telephone)) {
                    return Utils.showError(className, id, "Número de telefone inválido.");
                }

                Utils.hideError();


                if (isEdit && inputValue === valueEdit) return true;

                const existingTelephone = instructors.find((instructor) => instructor.telephone === inputValue);

                if (existingTelephone) return Utils.showError(className, id, "O telefone informado está em uso.");

                Utils.hideError();
                return true;

            },
            specialty: () => {
                if (!inputValue) return Utils.hideError();
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
            option.classList.add(this.inputName.value);
            optionsListInstructors.appendChild(option);

            const instructorsDOM = document.querySelector(".instructors") as HTMLDivElement;

            const box = document.createElement("div");
            box.classList.add("box-instructor");

            box.innerHTML = new Category().instructor(this.inputName.value, this.inputCPF.value, this.inputTelephone.value, this.inputSpecialty.value)

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

        this.boxInstructor.forEach(() => document.body.addEventListener("click", (e) => {
            const target = e.target as HTMLDivElement;
            if (target.classList.contains("icon-edit-instructor")) {
                const indexTarget = target.closest(".box-instructor");
                if (!indexTarget) return;
                const indexInstructorCPF = indexTarget.querySelector(".info-cpf-instructor") as HTMLSpanElement;
                const instructors = storage.get<InstructorType[], KeysLocalStorage>("instructors") || [];
                const instructor = instructors.find((instructor) =>
                    instructor.cpf === indexInstructorCPF.textContent);

                if (!instructor) return;

                Utils.hideError();
                
                inputNameEdit.value = instructor.name;
                inputCPFEdit.value = instructor.cpf;
                inputTelephoneEdit.value = instructor.telephone;
                inputSpecialtyEdit.value = instructor.specialty;

                inputNameEdit.addEventListener("input", () => {
                    this.validations(inputNameEdit.value, "message-error-name-instructor-edit", inputNameEdit.id).name();
                })

                inputTelephoneEdit.addEventListener("input", () => {
                    this.validations(inputTelephoneEdit.value, "message-error-telephone-instructor-edit", inputTelephoneEdit.id).telephone(true, instructor.telephone);
                })

                inputSpecialtyEdit.addEventListener("input", () => {
                    this.validations(inputSpecialtyEdit.value, "message-error-specialty-instructor-edit", inputSpecialtyEdit.id).specialty();
                })

                buttonSaveEdit.addEventListener("click", () => {

                    if (!this.validations(inputNameEdit.value, "message-error-name-instructor-edit", inputNameEdit.id).name()) return;
                    
                    if (!this.validations(inputTelephoneEdit.value, "message-error-telephone-instructor-edit", inputTelephoneEdit.id).telephone(true, instructor.telephone)) return;

                    if (!this.validations(inputSpecialtyEdit.value, "message-error-specialty-instructor-edit", inputSpecialtyEdit.id).specialty()) return;

                    indexTarget.innerHTML = new Category().instructor(inputNameEdit.value, inputCPFEdit.value, inputTelephoneEdit.value, inputSpecialtyEdit.value);

                    instructor.name = inputNameEdit.value;
                    instructor.cpf = inputCPFEdit.value;
                    instructor.telephone = inputTelephoneEdit.value;
                    instructor.specialty = inputSpecialtyEdit.value;

                    storage.edit<InstructorType[], KeysLocalStorage>(instructors, "instructors");
                    alert(`Instrutor atualizado com sucesso!`);

                    const listOptionsForWorkout = document.querySelectorAll<HTMLDivElement>("#list-instructors option");
                    
                    listOptionsForWorkout.forEach((option) => {
                        const instructorName = option.textContent.toLowerCase();
                        if (instructorName === instructor.name) {
                            option.textContent = instructor.name;
                        }
                    })
                });

            }

        }))
    };

    delete() {
        this.boxInstructor.forEach(() => document.body.addEventListener("click", (e) => {
            const target = e.target as HTMLDivElement;
            if (target.classList.contains("icon-remove-instructor")) {
                const indexTarget = target.closest(".box-instructor");
                if (!indexTarget) return;
                const instructorCPF = indexTarget.querySelector(".info-cpf-instructor") as HTMLSpanElement;

                const instructosUpdated = storage.get<InstructorType[], KeysLocalStorage>("instructors");

                if (instructosUpdated === null) return;

                const indexInstructor = instructosUpdated.findIndex((instructor) =>
                    instructor.cpf === instructorCPF.textContent);
                if (indexInstructor === -1) return;

                const listOptionsForWorkout = document.querySelectorAll<HTMLDivElement>("#list-instructors option");
                
                listOptionsForWorkout.forEach((option) => {
                    const instructorName = option.textContent.toLowerCase();
                    if (instructorName === instructosUpdated[indexInstructor]?.name.toLowerCase()) {
                        option.remove();
                    }
                })

                dashboard.update("delete").instructors();
                storage.delete<InstructorType, "instructors">("instructors", indexInstructor)
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
        Utils.search("input-search-instructors", "box-instructor", "info-for-search")
        new Category().section().actionsBoxInformation("box-instructor", ["icon-remove-instructor", "icon-edit-instructor"], ["information-action-remove-instructor", "information-action-edit-instructor"]);
        new Category().section().addition("button-to-register-instructors", "section-container-addition-instructors")
        new Category().section().edit("section-container-edit-instructors", "box-instructor", "icon-edit-instructor");
    };
}