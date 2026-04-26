import { section } from "./change-section.js";
import { theme } from "./change-theme.js";
import { menu } from "./menu-responsive.js";
import { Students } from "./students.js";
import { Workouts } from "./workouts.js";
import { Instructors } from "./instructors.js";
import { sectionCloseAllActionsOfCategory } from "./utils.js";

section.change();
menu.responsive();
theme.change();
theme.storage();
Workouts.actions();
Students.actions();
Instructors.actions();

sectionCloseAllActionsOfCategory();

const appendStudents = document.querySelector(".instructors") as HTMLDivElement;

window.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const boxInstructor = document.createElement("div");
        boxInstructor.classList.add("box-instructor");
        boxInstructor.innerHTML = 
        `
                        <div class="container-informations-instructors">
                            <p class="">
                                Instrutor:
                                <span class="informations-instructors-box-instructor">Alessandro Rocha</span>
                            </p>
                            <p class="">
                                CPF:
                                <span class="informations-instructors-box-instructor info-cpf-instructor">123.345.678-10</span>
                            </p>
                            <p class="">
                                Telefone
                                <span class="informations-instructors-box-instructor">(61) 92345-4042</span>
                            </p>
                            <p class="">
                                Especialidade
                                <span class="informations-instructors-box-instructor">Costas</span>
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
        `
        appendStudents.appendChild(boxInstructor);
    }
})


