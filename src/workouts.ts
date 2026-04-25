

class Workout {
    private buttonConclude;
    private buttonCancel;
    constructor() {
        this.buttonConclude = document.querySelectorAll<HTMLDivElement>(".icon-conclude-workout");
        this.buttonCancel = document.querySelectorAll<HTMLDivElement>(".icon-cancel-workout");
    };

    conclude() {
        const dashboardInformationConcludeWorkout = document.querySelector("#total-workouts-conclude") as HTMLDivElement;
        dashboardInformationConcludeWorkout
        this.buttonConclude.forEach((button) => button.addEventListener("click", (e) => {
            const target = e.target as HTMLDivElement;
            if (target.classList.contains("icon-conclude-workout")) {
                const targetIndex = target.closest(".box-workout");
                if (!targetIndex) return;
                targetIndex.remove();
                return 1;
            }
        }))
    };

    cancel() {
        this.buttonCancel.forEach((button) => button.addEventListener("click", (e) => {
            const target = e.target as HTMLDivElement;
            if (target.classList.contains("icon-cancel-workout")) {
                const targetIndex = target.closest(".box-workout");
                if (!targetIndex) return;
                targetIndex.remove();
                return 1
            }
        }))
    };

};

class Section {
    constructor() {};

    showBoxActionInformation() {
        const boxWorkout = document.querySelectorAll<HTMLDivElement>(".box-workout");
        const events = ["mouseover", "mouseout"];
        const iconsButtons = ["icon-cancel-workout", "icon-conclude-workout"];
        const containerInformations = [
            "information-action-conclude",
            "information-action-cancel"
        ];

        boxWorkout.forEach((workout) => events.forEach((typeEvent) => {
            workout.addEventListener(typeEvent, (e) => {
                const target = e.target as HTMLDivElement;
                iconsButtons.forEach((button) => {
                    if (target.classList.contains(button)) {
                        const indexInformation = containerInformations.findIndex((information) => information.includes(`${button.split("-")[1]}`));
                        const indexTarget = target.closest(".box-workout") as HTMLDivElement;
                        const indexQuery = indexTarget.querySelector(`.${containerInformations[indexInformation]}`) as HTMLDivElement;
                        indexQuery.classList.toggle("show")
                    };
                }) 
            })
        }))
    };

    openSectionAddWorkouts() {
        const buttonAddWorkouts = document.querySelector(".button-to-mark-workouts") as HTMLButtonElement;

        buttonAddWorkouts.addEventListener("click", () => {
            const sectionAddWorkouts = document.querySelector("#section-container-addition-workouts") as HTMLDivElement;
            sectionAddWorkouts.classList.add("show")
        });
    };

};

const section = new Section();
const workout = new Workout();

export class Workouts {
    static actions() {
        section.openSectionAddWorkouts();
        section.showBoxActionInformation();
        workout.conclude();
        workout.cancel();
    };
};
