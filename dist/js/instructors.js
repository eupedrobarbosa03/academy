class Instructor {
}
;
class Section {
    constructor() { }
    ;
    showBoxActionInformation() {
        const boxWorkout = document.querySelectorAll(".box-instructor");
        const events = ["mouseover", "mouseout"];
        const iconsButtons = ["icon-remove-instructor", "icon-edit-instructor"];
        const containerInformations = [
            "information-action-remove-instructor",
            "information-action-edit-instructor"
        ];
        boxWorkout.forEach((workout) => events.forEach((typeEvent) => {
            workout.addEventListener(typeEvent, (e) => {
                const target = e.target;
                iconsButtons.forEach((button) => {
                    if (target.classList.contains(button)) {
                        const indexInformation = containerInformations.findIndex((information) => information.includes(`${button.split("-")[1]}`));
                        const indexTarget = target.closest(".box-instructor");
                        const indexQuery = indexTarget.querySelector(`.${containerInformations[indexInformation]}`);
                        indexQuery.classList.toggle("show");
                    }
                    ;
                });
            });
        }));
    }
    ;
}
;
const section = new Section();
export class Instructors {
    static actions() {
        section.showBoxActionInformation();
    }
    ;
}
