import { section } from "./change-section.js";
import { theme } from "./change-theme.js";
import { menu } from "./menu-responsive.js";
import { Students } from "./students.js";
import { Workouts } from "./workouts.js";
import { Instructors } from "./instructors.js";
import { Utils } from "./utils.js";

section.change();
menu.responsive();
theme.change();
theme.storage();
Workouts.actions();
Students.actions();
Instructors.actions();
Utils.closeAllSection();

const appendStudents = document.querySelector(".students") as HTMLDivElement;

window.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const boxInstructor = document.createElement("div");
        boxInstructor.classList.add("box-student");
        boxInstructor.innerHTML = 
        `
                    <div class="container-informations-students">
                        <p class="">
                            Matrícula:
                            <span class="informations-students-box-student">00-49093</span>
                        </p>
                        <p class="">
                            Aluno:
                            <span class="informations-students-box-student">Pedro</span>
                        </p>
                        <p class="">
                            CPF:
                            <span class="informations-students-box-student info-cpf-student">123.345.678-10</span>
                        </p>
                        <p class="">
                            Telefone
                            <span class="informations-students-box-student">(61) 99131-3359</span>
                        </p>
                        <p class="">
                            Plano
                            <span class="informations-students-box-student">Plus</span>
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
        `
        appendStudents.appendChild(boxInstructor);
    }
})


