import { dashboard } from "./dashboard.js";
class Workout {
    buttonConclude;
    buttonCancel;
    constructor() {
        this.buttonConclude = document.querySelectorAll(".icon-conclude-workout");
        this.buttonCancel = document.querySelectorAll(".icon-cancel-workout");
    }
    ;
    conclude() {
        this.buttonConclude.forEach((button) => document.body.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("icon-conclude-workout")) {
                const targetIndex = target.closest(".box-workout");
                if (!targetIndex)
                    return;
                targetIndex.remove();
                dashboard.update('conclude').workouts();
            }
        }));
    }
    ;
    cancel() {
        this.buttonCancel.forEach((button) => document.body.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("icon-cancel-workout")) {
                const targetIndex = target.closest(".box-workout");
                if (!targetIndex)
                    return;
                targetIndex.remove();
                dashboard.update("cancel").workouts();
            }
        }));
    }
    ;
}
;
class Section {
    constructor() { }
    ;
    static showBoxActionInformation() {
        const boxWorkout = document.querySelectorAll(".box-workout");
        const events = ["mouseover", "mouseout"];
        const iconsButtons = ["icon-cancel-workout", "icon-conclude-workout"];
        const containerInformations = [
            "information-action-conclude",
            "information-action-cancel"
        ];
        boxWorkout.forEach((workout) => events.forEach((typeEvent) => {
            document.body.addEventListener(typeEvent, (e) => {
                const target = e.target;
                iconsButtons.forEach((button) => {
                    if (target.classList.contains(button)) {
                        const indexInformation = containerInformations.findIndex((information) => information.includes(`${button.split("-")[1]}`));
                        const indexTarget = target.closest(".box-workout");
                        const indexQuery = indexTarget.querySelector(`.${containerInformations[indexInformation]}`);
                        indexQuery.classList.toggle("show");
                    }
                    ;
                });
            });
        }));
    }
    ;
    static openSectionAddWorkouts() {
        const buttonAddWorkouts = document.querySelector(".button-to-mark-workouts");
        buttonAddWorkouts.addEventListener("click", () => {
            const sectionAddWorkouts = document.querySelector("#section-container-addition-workouts");
            sectionAddWorkouts.classList.add("show");
        });
    }
    ;
}
;
const workout = new Workout();
export class Workouts {
    static actions() {
        Section.showBoxActionInformation();
        Section.openSectionAddWorkouts();
        workout.conclude();
        workout.cancel();
    }
    ;
}
;
