import { dashboard } from "./dashboard.js";
import { academyRegex } from "./regex.js";
import { Utils } from "./utils.js";
import { storage } from "./storage.js";
import { Category } from "./dom-box-category-utils.js";
class Student {
    boxStudent;
    inputName;
    inputCPF;
    inputTelephone;
    planSelected;
    constructor() {
        this.boxStudent = document.querySelectorAll(".box-instructor");
        this.inputName = document.querySelector("#input-student-name-register");
        this.inputCPF = document.querySelector("#input-student-cpf-register");
        this.inputTelephone = document.querySelector("#input-student-telephone-register");
        this.planSelected = document.querySelector("#student-plan-for-register");
    }
    ;
    numberOfRegister() {
        const numbers = "0123456789";
        let register = '';
        for (let i = 0; i < 5; i++) {
            const random = numbers[Math.floor(Math.random() * numbers.length)];
            if (register.includes(`${random}`)) {
                i--;
                continue;
            }
            register += `${random}`;
        }
        ;
        const registerFormated = register.padStart(register.length + 3, "00-");
        return registerFormated;
    }
    ;
    validations(inputValue, className, id) {
        const instructors = storage.get("students") || [];
        return {
            name: () => {
                if (!inputValue)
                    return Utils.hideError();
                if (!inputValue.match(academyRegex.name)) {
                    return Utils.showError(className, id, `Nome inválido. Tente novamente...`);
                }
                ;
                Utils.hideError();
                return true;
            },
            cpf: () => {
                if (!inputValue)
                    return Utils.hideError();
                if (!inputValue.match(academyRegex.cpf)) {
                    return Utils.showError(className, id, `CPF inválido. Verifique o formato.`);
                }
                ;
                Utils.hideError();
                if (!inputValue.includes("-")) {
                    const format = `${inputValue.slice(0, 3)}.${inputValue.slice(3, 6)}.${inputValue.slice(6, 9)}-${inputValue.slice(9, 11)}`;
                    this.inputCPF.value = format;
                }
                ;
                const existingCFP = instructors.find((instructor) => instructor.cpf === inputValue);
                if (existingCFP)
                    return Utils.showError(className, id, "O CPF informado está em uso.");
                Utils.hideError();
                return true;
            },
            telephone: (isEdit, valueEdit) => {
                if (!inputValue)
                    return Utils.hideError();
                if (!inputValue.match(academyRegex.telephone)) {
                    return Utils.showError(className, id, "Número de telefone inválido.");
                }
                Utils.hideError();
                if (isEdit && inputValue === valueEdit)
                    return true;
                const existingTelephone = instructors.find((instructor) => instructor.telephone === inputValue);
                if (existingTelephone)
                    return Utils.showError(className, id, "O telefone informado está em uso.");
                Utils.hideError();
                return true;
            }
        };
    }
    create() {
        const buttonRegister = document.querySelector(".button-save-register-student");
        this.inputName.addEventListener("input", () => {
            this.validations(this.inputName.value, "message-error-name-student", this.inputName.id).name();
        });
        this.inputCPF.addEventListener("input", () => {
            this.validations(this.inputCPF.value, "message-error-cpf-student", this.inputCPF.id).cpf();
        });
        this.inputTelephone.addEventListener("input", () => {
            this.validations(this.inputTelephone.value, "message-error-telephone-student", this.inputTelephone.id).telephone();
        });
        buttonRegister.addEventListener("click", () => {
            if (!this.validations(this.inputName.value, "message-error-name-student", this.inputName.id).name())
                return;
            if (!this.validations(this.inputCPF.value, "message-error-cpf-student", this.inputCPF.id).cpf())
                return;
            if (!this.validations(this.inputTelephone.value, "message-error-telephone-student", this.inputTelephone.id).telephone())
                return;
            const studentsDOM = document.querySelector(".students");
            const box = document.createElement("div");
            box.classList.add("box-student");
            const register = this.numberOfRegister();
            box.innerHTML = new Category().student(register, this.inputName.value, this.inputCPF.value, this.inputTelephone.value, this.planSelected.value);
            studentsDOM.appendChild(box);
            storage.add({
                register: register,
                name: this.inputName.value,
                cpf: this.inputCPF.value,
                telephone: this.inputTelephone.value,
                plan: this.planSelected.value
            }, "students");
            Utils.clearnInputs();
            alert(`Aluno adicionado com sucesso!`);
            dashboard.update("create").students();
        });
    }
    ;
    edit() {
        const boxStudent = document.querySelectorAll(".box-student");
        boxStudent.forEach(() => document.body.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("icon-edit-student")) {
                const indexTarget = target.closest(".box-student");
                if (!indexTarget)
                    return;
            }
        }));
    }
    ;
    delete() {
        const boxStudent = document.querySelectorAll(".box-student");
        boxStudent.forEach((box) => document.body.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("icon-remove-student")) {
                const indexTarget = target.closest(".box-student");
                if (!indexTarget)
                    return;
                indexTarget.remove();
                dashboard.update("delete").students();
            }
        }));
    }
    ;
}
;
const student = new Student();
export class Students {
    static actions() {
        student.create();
        student.edit();
        student.delete();
        Utils.search("input-search-students", "box-student", "info-for-search");
        new Category().section().actionsBoxInformation("box-student", ["icon-remove-student", "icon-edit-student"], ["information-action-remove-student", "information-action-edit-student"]);
        new Category().section().addition("button-to-register-students", "section-container-addition-students");
        new Category().section().edit("section-container-edit-students", "box-student", "icon-edit-student");
    }
    ;
}
