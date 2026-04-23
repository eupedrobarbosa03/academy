import { theme } from "./change-theme.js";

class Section {
    constructor() {};

    showBoxActionInformation() {
        const boxStudent = document.querySelectorAll<HTMLDivElement>(".box-student");
        const events = ["mouseover", "mouseout"]
        const iconsButtons = ["icon-remove-student", "icon-edit-student"];
        const containerInformations = [
            "information-action-remove-student",
            "information-action-edit-student"
        ];
        boxStudent.forEach((box) => events.forEach((typeEvent) => {
            box.addEventListener(typeEvent, (e) => {
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

    openSectionAddStudents() {
        const buttonAddWStudents = document.querySelector(".button-to-register-students") as HTMLButtonElement;

        buttonAddWStudents.addEventListener("click", () => {
            const sectionAddWorkouts = document.querySelector("#section-container-addition-students") as HTMLDivElement;
            sectionAddWorkouts.classList.add("show")
        });
    };

    openSectionEditStudents() {
        const iconButtonEditStudent = document.querySelectorAll<HTMLDivElement>(".icon-edit-student");
        const sectionEditStudent = document.querySelector("#section-container-edit-students") as HTMLDivElement;
        iconButtonEditStudent.forEach((button) => button.addEventListener("click", () => {
            sectionEditStudent.classList.add("show")
        }));
    };


};

class Student {
    constructor() {};

    edit() {
        const boxStudent = document.querySelectorAll<HTMLDivElement>(".box-student");
        boxStudent.forEach((box) => box.addEventListener("click", (e) => {
            const target = e.target as HTMLDivElement;
            if (target.classList.contains("icon-edit-student")) {
                const indexTarget = target.closest(".box-student");
                if (!indexTarget) return;
                const inputName = document.getElementById("input-student-name-edit") as HTMLInputElement;
                const inputCPF = document.querySelector("#input-student-cpf-edit") as HTMLInputElement;
                const inputTelephone = document.querySelector("#input-student-telephone-edit") as HTMLInputElement;
                console.log(inputName);
                inputName.value = "Joãozin";
                inputCPF.value = "123-456-789-10";
                inputTelephone.value = "(61) 99131-3359"
            }

        }))
    };

};


const section = new Section();
const student = new Student();

export class Students {
    static actions() {
        section.showBoxActionInformation();
        section.openSectionAddStudents();
        section.openSectionEditStudents();
        student.edit();
    };
}