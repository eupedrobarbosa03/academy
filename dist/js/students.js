import { dashboard } from "./dashboard.js";
import { academyRegex } from "./regex.js";
import { Utils } from "./utils.js";
import { storage } from "./storage.js";
import { Category } from "./dom-box-category-utils.js";
class Student {
    inputName;
    inputCPF;
    inputTelephone;
    planSelected;
    constructor() {
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
                if (!inputValue.match(academyRegex.name)) {
                    return Utils.showError(className, id, `Nome inválido. Tente novamente...`);
                }
                ;
                Utils.hideError();
                return true;
            },
            cpf: () => {
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
            telephone: (valueEdit) => {
                if (!inputValue.match(academyRegex.telephone)) {
                    return Utils.showError(className, id, "Número de telefone inválido.");
                }
                if (inputValue === valueEdit)
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
            new Category().clearForRederingToStorage("box-student");
            storage.dom().student();
        });
    }
    ;
    edit() {
        const buttonSaveEdit = document.querySelector(".button-save-edit-student");
        const inputNameEdit = document.querySelector("#input-student-name-edit");
        const inputCPFEdit = document.querySelector("#input-student-cpf-edit");
        const inputTelephoneEdit = document.querySelector("#input-student-telephone-edit");
        const planSelectedEdit = document.querySelector("#student-plan-for-edit");
        document.body.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("icon-edit-student")) {
                const indexTarget = target.closest(".box-student");
                if (!indexTarget)
                    return;
                const indexStudentCPF = indexTarget.querySelector(".info-cpf-student");
                const students = storage.get("students") || [];
                const student = students.find((instructor) => instructor.cpf === indexStudentCPF.textContent);
                if (!student)
                    return;
                Utils.hideError();
                inputNameEdit.value = student.name;
                inputCPFEdit.value = student.cpf;
                inputTelephoneEdit.value = student.telephone;
                planSelectedEdit.value = student.plan;
                inputNameEdit.addEventListener("input", () => {
                    this.validations(inputNameEdit.value, "message-error-name-student-edit", inputNameEdit.id).name();
                });
                inputTelephoneEdit.addEventListener("input", () => {
                    this.validations(inputTelephoneEdit.value, "message-error-telephone-student-edit", inputTelephoneEdit.id).telephone(student.telephone);
                });
                buttonSaveEdit.addEventListener("click", () => {
                    if (!this.validations(inputNameEdit.value, "message-error-name-student-edit", inputNameEdit.id).name())
                        return;
                    if (!this.validations(inputTelephoneEdit.value, "message-error-telephone-student-edit", inputTelephoneEdit.id).telephone(student.telephone))
                        return;
                    indexTarget.innerHTML = new Category().student(student.register, inputNameEdit.value, inputCPFEdit.value, inputTelephoneEdit.value, planSelectedEdit.value);
                    student.name = inputNameEdit.value;
                    student.cpf = inputCPFEdit.value;
                    student.telephone = inputTelephoneEdit.value;
                    student.plan = planSelectedEdit.value;
                    storage.edit(students, "students");
                    new Category().clearForRederingToStorage("box-student");
                    storage.dom().student();
                    alert(`Aluno atualizado com sucesso!`);
                    Utils.closeAllSection();
                });
            }
        });
    }
    ;
    delete() {
        document.body.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("icon-remove-student")) {
                const indexTarget = target.closest(".box-student");
                if (!indexTarget)
                    return;
                const studentCPF = indexTarget.querySelector(".info-cpf-student");
                const studentsUpdated = storage.get("students");
                if (studentsUpdated === null)
                    return;
                const indexStudent = studentsUpdated.findIndex((student) => student.cpf === studentCPF.textContent);
                if (indexStudent === -1)
                    return;
                dashboard.update("delete").students();
                storage.delete("students", indexStudent);
                indexTarget.remove();
                new Category().clearForRederingToStorage("box-student");
                storage.dom().student();
            }
        });
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
