import { dashboard } from "./dashboard.js";
import { academyRegex } from "./regex.js";
import { Utils } from "./utils.js";
import { StudentType } from "./interfaces.js";
import { storage, KeysLocalStorage } from "./storage.js";
import { Category } from "./dom-box-category-utils.js";


class Student {
    private inputName;
    private inputCPF;
    private inputTelephone;
    private planSelected
    constructor() {
        this.inputName = document.querySelector("#input-student-name-register") as HTMLInputElement;
        this.inputCPF = document.querySelector("#input-student-cpf-register") as HTMLInputElement;
        this.inputTelephone = document.querySelector("#input-student-telephone-register") as HTMLInputElement;
        this.planSelected = document.querySelector("#student-plan-for-register") as HTMLInputElement;
    };

    numberOfRegister() {
        const numbers = "0123456789";
        let register = '';
        for (let i = 0; i < 5; i++) {
            const random = numbers[Math.floor(Math.random() * numbers.length)];
            if (register.includes(`${random}`)) {
                i--;
                continue;
            }
            register += `${random}`
        };
        
        const registerFormated = register.padStart(register.length + 3, "00-");
        return registerFormated;
    };

    private validations(inputValue: string, className: string, id: string) {
        const instructors = storage.get<StudentType[], KeysLocalStorage>("students") || [];
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

                Utils.hideError();
                
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
            telephone: (valueEdit?: string) => {

                if (!inputValue.match(academyRegex.telephone)) {
                    return Utils.showError(className, id, "Número de telefone inválido.");
                }

                if (inputValue === valueEdit) return true;

                const existingTelephone = instructors.find((instructor) => instructor.telephone === inputValue);

                if (existingTelephone) return Utils.showError(className, id, "O telefone informado está em uso.");

                Utils.hideError();

                return true;

            }
        }
    }

    create() {

        const buttonRegister = document.querySelector(".button-save-register-student") as HTMLDivElement;

        this.inputName.addEventListener("input", () => {
            this.validations(this.inputName.value, "message-error-name-student", this.inputName.id).name();
        })

        this.inputCPF.addEventListener("input", () => {
            this.validations(this.inputCPF.value, "message-error-cpf-student", this.inputCPF.id).cpf();
        })

        this.inputTelephone.addEventListener("input", () => {
            this.validations(this.inputTelephone.value, "message-error-telephone-student", this.inputTelephone.id).telephone();
        })


        buttonRegister.addEventListener("click", () => {

            if (!this.validations(this.inputName.value, "message-error-name-student", this.inputName.id).name()) return;

            if (!this.validations(this.inputCPF.value, "message-error-cpf-student", this.inputCPF.id).cpf()) return;

            if (!this.validations(this.inputTelephone.value, "message-error-telephone-student", this.inputTelephone.id).telephone()) return;


            const studentsDOM = document.querySelector(".students") as HTMLDivElement;

            const box = document.createElement("div");
            box.classList.add("box-student");

            const register = this.numberOfRegister();

            box.innerHTML = new Category().student(register, this.inputName.value, this.inputCPF.value, this.inputTelephone.value, this.planSelected.value)

            studentsDOM.appendChild(box);

            storage.add<StudentType, "students">({
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

        })
    };

    edit() {
        const buttonSaveEdit = document.querySelector(".button-save-edit-student") as HTMLButtonElement;
        const inputNameEdit = document.querySelector("#input-student-name-edit") as HTMLInputElement;
        const inputCPFEdit = document.querySelector("#input-student-cpf-edit") as HTMLInputElement;
        const inputTelephoneEdit = document.querySelector("#input-student-telephone-edit") as HTMLInputElement;
        const planSelectedEdit = document.querySelector("#student-plan-for-edit") as HTMLSelectElement;


        document.body.addEventListener("click", (e) => {
           const target = e.target as HTMLDivElement;
            if (target.classList.contains("icon-edit-student")) {
                const indexTarget = target.closest(".box-student");
                if (!indexTarget) return;
                const indexStudentCPF = indexTarget.querySelector(".info-cpf-student") as HTMLSpanElement;
                const students = storage.get<StudentType[], KeysLocalStorage>("students") || [];
                const student = students.find((instructor) =>
                    instructor.cpf === indexStudentCPF.textContent);

                if (!student) return;

                Utils.hideError();
                
                inputNameEdit.value = student.name;
                inputCPFEdit.value = student.cpf;
                inputTelephoneEdit.value = student.telephone;
                planSelectedEdit.value = student.plan;

                inputNameEdit.addEventListener("input", () => {
                    this.validations(inputNameEdit.value, "message-error-name-student-edit", inputNameEdit.id).name();
                })

                inputTelephoneEdit.addEventListener("input", () => {
                    this.validations(inputTelephoneEdit.value, "message-error-telephone-student-edit", inputTelephoneEdit.id).telephone(student.telephone);
                })

                buttonSaveEdit.addEventListener("click", () => {

                    if (!this.validations(inputNameEdit.value, "message-error-name-student-edit", inputNameEdit.id).name()) return;
                    
                    if (!this.validations(inputTelephoneEdit.value, "message-error-telephone-student-edit", inputTelephoneEdit.id).telephone(student.telephone)) return;


                    indexTarget.innerHTML = new Category().student(
                        student.register,
                        inputNameEdit.value,
                        inputCPFEdit.value,
                        inputTelephoneEdit.value,
                        planSelectedEdit.value
                    );

                    student.name = inputNameEdit.value;
                    student.cpf = inputCPFEdit.value;
                    student.telephone = inputTelephoneEdit.value;
                    student.plan = planSelectedEdit.value;

                    storage.edit<StudentType[], KeysLocalStorage>(students, "students");
                    new Category().clearForRederingToStorage("box-student");
                    storage.dom().student();
                    alert(`Aluno atualizado com sucesso!`);

                    Utils.closeAllSection();

                });
            }
        });
    };

    delete() {
        document.body.addEventListener("click", (e) => {
            const target = e.target as HTMLDivElement;
            if (target.classList.contains("icon-remove-student")) {
                const indexTarget = target.closest(".box-student");
                if (!indexTarget) return;
                const studentCPF = indexTarget.querySelector(".info-cpf-student") as HTMLSpanElement;

                const studentsUpdated = storage.get<StudentType[], KeysLocalStorage>("students");

                if (studentsUpdated === null) return;

                const indexStudent = studentsUpdated.findIndex((student) =>
                    student.cpf === studentCPF.textContent);
                if (indexStudent === -1) return;


                dashboard.update("delete").students();
                storage.delete<StudentType, "students">("students", indexStudent)
                indexTarget.remove();

                new Category().clearForRederingToStorage("box-student");
                storage.dom().student();

            }
        })
    };

};


const student = new Student();

export class Students {
    static actions() {
        student.create();
        student.edit();
        student.delete();
        Utils.search("input-search-students", "box-student", "info-for-search");
        new Category().section().actionsBoxInformation("box-student", ["icon-remove-student", "icon-edit-student"], ["information-action-remove-student", "information-action-edit-student"]);
        new Category().section().addition("button-to-register-students", "section-container-addition-students")
        new Category().section().edit("section-container-edit-students", "box-student", "icon-edit-student");
    };
}
