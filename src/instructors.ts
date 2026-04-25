class Section {
    constructor() {};

    showBoxActionInformation() {
        const boxWorkout = document.querySelectorAll<HTMLDivElement>(".box-instructor");
        const events = ["mouseover", "mouseout"];
        const iconsButtons = ["icon-remove-instructor", "icon-edit-instructor"];
        const containerInformations = [
            "information-action-remove-instructor",
            "information-action-edit-instructor"
        ];

        boxWorkout.forEach((workout) => events.forEach((typeEvent) => {
            workout.addEventListener(typeEvent, (e) => {
                const target = e.target as HTMLDivElement;
                iconsButtons.forEach((button) => {
                    if (target.classList.contains(button)) {
                        const indexInformation = containerInformations.findIndex((information) => information.includes(`${button.split("-")[1]}`));
                        const indexTarget = target.closest(".box-instructor") as HTMLDivElement;
                        const indexQuery = indexTarget.querySelector(`.${containerInformations[indexInformation]}`) as HTMLDivElement;
                        indexQuery.classList.toggle("show")
                    };
                }) 
            })
        }))
    };

    openSectionAddInstructors() {
        const buttonAddWStudents = document.querySelector(".button-to-register-instructors") as HTMLButtonElement;

        buttonAddWStudents.addEventListener("click", () => {
            const sectionAddWorkouts = document.querySelector("#section-container-addition-instructors") as HTMLDivElement;
            sectionAddWorkouts.classList.add("show")
        });
    };

    openSectionEditStudents() {
        const iconButtonEditInstructor = document.querySelectorAll<HTMLDivElement>(".icon-edit-instructor");
        const sectionEditInstructor = document.querySelector("#section-container-edit-instructors") as HTMLDivElement;
        iconButtonEditInstructor.forEach((button) => button.addEventListener("click", () => {
            sectionEditInstructor.classList.add("show")
        }));
    };


};

class Instructor {
    private boxInstructor;;
    constructor() {
        this.boxInstructor = document.querySelectorAll<HTMLDivElement>(".box-instructor");
    };
    
    edit() {
        this.boxInstructor.forEach((box) => box.addEventListener("click", (e) => {
            const target = e.target as HTMLDivElement;
            if (target.classList.contains("icon-edit-instructor")) {
                const indexTarget = target.closest(".box-instructor");
                if (!indexTarget) return;
                const inputName = document.getElementById("input-instructor-name-edit") as HTMLInputElement;
                const inputCPF = document.querySelector("#input-instructor-cpf-edit") as HTMLInputElement;
                const inputTelephone = document.querySelector("#input-instructor-telephone-edit") as HTMLInputElement;
                inputName.value = 'Alessandro'
                inputCPF.value = '123.456.789.10'
                inputTelephone.value = "(61) 99131-3359"
            }

        }))
    };

    delete() {
        this.boxInstructor.forEach((box) => box.addEventListener("click", (e) => {
            const target = e.target as HTMLDivElement;
            if (target.classList.contains("icon-remove-instructor")) {
                const indexTarget = target.closest(".box-instructor");
                if (!indexTarget) return;
                indexTarget.remove();
            }

        }))
    };
};

const section = new Section();
const instructor = new Instructor();

export class Instructors {
    static actions() {
        section.showBoxActionInformation();
        section.openSectionAddInstructors();
        section.openSectionEditStudents();
        instructor.edit();
        instructor.delete();
    };
}