import { dashboard } from "./dashboard.js";

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
    constructor() {};

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
        Section.showBoxActionInformation();
        Section.openSectionAddStudents();
        Section.openSectionEditStudents();
        student.edit();
        student.delete();
    };
}