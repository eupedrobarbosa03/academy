import { dashboard } from "./dashboard.js";
import { academyRegex } from "./regex.js";
import { Utils } from "./utils.js";
import { StudentType } from "./interfaces.js";
import { storage, KeysLocalStorage } from "./storage.js";
import { BoxCategory } from "./dom-box-category-utils.js";

class Section {
    constructor() {};

    static showBoxActionInformation() {
        const boxStudent = document.querySelectorAll<HTMLDivElement>(".box-student");
        const events = ["mouseover", "mouseout"]
        const iconsButtons = ["icon-remove-student", "icon-edit-student"];
        const containerInformations = [
            "information-action-remove-student",
            "information-action-edit-student"
        ];
        boxStudent.forEach((box) => events.forEach((typeEvent) => {
            document.body.addEventListener(typeEvent, (e) => {
                const target = e.target as HTMLDivElement;
                iconsButtons.forEach((button) => {
                    if (target.classList.contains(button)) {
                        const indexInformation = containerInformations.findIndex((information) => information.includes(`${button.split("-")[1]}`));
                        const indexTarget = target.closest(".box-student") as HTMLDivElement;
                        const indexQuery = indexTarget.querySelector(`.${containerInformations[indexInformation]}`) as HTMLDivElement;
                        indexQuery.classList.toggle("show")
                    };
                });
            });
        }))
    };

    static openSectionAddStudents() {
        const buttonAddWStudents = document.querySelector(".button-to-register-students") as HTMLButtonElement;
        buttonAddWStudents.addEventListener("click", () => {
            const sectionAddWorkouts = document.querySelector("#section-container-addition-students") as HTMLDivElement;
            sectionAddWorkouts.classList.add("show")
        });
    };

    static openSectionEditStudents() {
        const sectionEditStudents = document.querySelector("#section-container-edit-students") as HTMLDivElement;
        const boxStudent = document.querySelectorAll<HTMLDivElement>(".box-student");
        boxStudent.forEach((box) => document.body.addEventListener("click", (e) => {
            const target = e.target as HTMLDivElement;
            if (target.classList.contains("icon-edit-student")) {
                const indexTarget = target.closest(".box-student");
                if (!indexTarget) return;
                sectionEditStudents.classList.add("show");
            }
        }));
    };
    


};

class Student {
    private boxStudent;
    private inputName;
    private inputCPF;
    private inputTelephone;
    private planSelected
    constructor() {
        this.boxStudent = document.querySelectorAll<HTMLDivElement>(".box-instructor");
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
            telephone: (isEdit?: boolean, valueEdit?: string) => {

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
            plan: () => {

                if (!inputValue) {
                    return Utils.showError(className, id, `Selecione um plano.`)
                }

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

        this.planSelected.addEventListener("input", () => {
            this.validations(this.planSelected.value, "message-error-plan-student", this.planSelected.id).plan();
        })

        buttonRegister.addEventListener("click", () => {

            if (!this.validations(this.inputName.value, "message-error-name-student", this.inputName.id).name()) return;
            
            if (!this.validations(this.inputCPF.value, "message-error-cpf-student", this.inputCPF.id).cpf()) return;

            if (!this.validations(this.inputTelephone.value, "message-error-telephone-student", this.inputTelephone.id).telephone()) return;

            if (!this.validations(this.planSelected.value, "message-error-plan-student", this.planSelected.id).plan()) return;

            const studentsDOM = document.querySelector(".students") as HTMLDivElement;

            const box = document.createElement("div");
            box.classList.add("box-students");

            const register = this.numberOfRegister();

            box.innerHTML = new BoxCategory().student(register, this.inputName.value, this.inputCPF.value, this.inputTelephone.value, this.planSelected.value)

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

        })
    };

    edit() {
        const boxStudent = document.querySelectorAll<HTMLDivElement>(".box-student");
        boxStudent.forEach((box) => document.body.addEventListener("click", (e) => {
            const target = e.target as HTMLDivElement;
            if (target.classList.contains("icon-edit-student")) {
                const indexTarget = target.closest(".box-student");
                if (!indexTarget) return;
            }

        }))
    };

    delete() {
        const boxStudent = document.querySelectorAll<HTMLDivElement>(".box-student");
        boxStudent.forEach((box) => document.body.addEventListener("click", (e) => {
            const target = e.target as HTMLDivElement;
            if (target.classList.contains("icon-remove-student")) {
                const indexTarget = target.closest(".box-student");
                if (!indexTarget) return;
                indexTarget.remove();
                dashboard.update("delete").students();
            }
        }))
    };

};


const student = new Student();

export class Students {
    static actions() {
        student.create();
        student.edit();
        student.delete();
        Section.showBoxActionInformation();
        Section.openSectionAddStudents();
        Section.openSectionEditStudents();
    };
}
