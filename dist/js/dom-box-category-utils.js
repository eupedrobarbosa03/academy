import { Utils } from "./utils.js";
export class Category {
    constructor() { }
    ;
    section() {
        return {
            actionsBoxInformation: function (queryCategory, buttonsCategory, queryInformations) {
                const BoxCategory = document.querySelectorAll(`.${queryCategory}`);
                const events = ["mouseover", "mouseout"];
                const buttons = [...buttonsCategory];
                const informations = [...queryInformations];
                BoxCategory.forEach(() => events.forEach((typeEvent) => document.body.addEventListener(typeEvent, (e) => {
                    const target = e.target;
                    buttons.forEach((button) => {
                        if (target.classList.contains(button)) {
                            const information = informations.findIndex((info) => info.includes(`${button.split("-")[1]}`));
                            const indexBoxCategory = target.closest(`.${queryCategory}`);
                            if (!indexBoxCategory)
                                return;
                            const queryBoxCategory = indexBoxCategory.querySelector(`.${informations[information]}`);
                            queryBoxCategory.classList.toggle("show");
                        }
                        ;
                    });
                })));
            },
            addition: function (button, querySectionCategory) {
                const buttonAddition = document.querySelector(`.${button}`);
                buttonAddition.addEventListener("click", () => {
                    Utils.hideError();
                    const section = document.querySelector(`#${querySectionCategory}`);
                    section.classList.add("show");
                });
            },
            edit: function (querySectionCategory, queryCategory, queryButtonEditCategory) {
                const section = document.querySelector(`#${querySectionCategory}`);
                const boxCategory = document.querySelectorAll(`.${queryCategory}`);
                boxCategory.forEach(() => document.body.addEventListener("click", (e) => {
                    const target = e.target;
                    if (target.classList.contains(queryButtonEditCategory)) {
                        const indexBoxCategory = target.closest(`.${queryCategory}`);
                        if (!indexBoxCategory)
                            return;
                        section.classList.add("show");
                    }
                }));
            }
        };
    }
    ;
    removeHide() {
        const categories = ["box-instructor", "box-workout", "box-student"];
        categories.forEach((category) => {
            const query = document.querySelectorAll(`.${category}`);
            query.forEach((q) => q.classList.remove("hide"));
        });
    }
    ;
    student(register, name, cpf, telephone, plan) {
        const box = `
        <div class="container-informations-students">
            <p class="">
                Matrícula:
                <span class="informations-students-box-student info-for-search">${register}</span>
            </p>
            <p class="">
                Aluno:
                <span class="informations-students-box-student info-for-search">${name}</span>
            </p>
            <p class="">
                CPF:
                <span class="informations-students-box-student info-cpf-student info-for-search">${cpf}</span>
            </p>
            <p class="">
                Telefone
                <span class="informations-students-box-student">${telephone}</span>
            </p>
            <p class="">
                Plano
                <span class="informations-students-box-student">${plan}</span>
            </p>
            <p class="">
                Status
                <span class="informations-students-box-student">Ativo</span>
            </p>
        </div>
        <div class="container-actions-box-students">
            <i class="fa-solid fa-pen-to-square icon-edit-student"></i>
            <i class="fa-solid fa-trash icon-remove-student"></i>
            <div class="information-action-edit-student information-action">
                <p class="">Editar</p>
            </div>
            <div class="information-action-remove-student information-action">
                <p class="">Remover</p>
            </div>
        </div>
        `;
        return box;
    }
    instructor(name, cpf, telephone, specialty) {
        const box = `
                <div class="container-informations-instructors">
                    <p class="">
                        Instrutor:
                        <span class="informations-instructors-box-instructor info-for-search">${name}</span>
                    </p>
                    <p class="">
                        CPF:
                        <span class="informations-instructors-box-instructor info-cpf-instructor info-for-search">${cpf}</span>
                    </p>
                    <p class="">
                        Telefone:
                        <span class="informations-instructors-box-instructor">${telephone}</span>
                    </p>
                    <p class="">
                        Especialidade:
                        <span class="informations-instructors-box-instructor">${specialty}</span>
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
        `;
        return box;
    }
    ;
}
;
