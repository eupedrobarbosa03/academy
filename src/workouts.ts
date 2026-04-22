function showBoxActionInformation() {
    const boxWorkout = document.querySelectorAll<HTMLDivElement>(".box-workout");
    const events = ["mouseover", "mouseout"];
    const iconsButtons = ["icon-cancel-workout", "icon-check-workout"];
    const containerInformations = [
        "information-action-check",
        "information-action-cancel"
    ];
    boxWorkout.forEach((workout) => {
        events.forEach((typeEvent) => {
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
            });
        });
    });
};

function openSectionAddWorkouts() {
    const buttonAddWorkouts = document.querySelector(".button-to-mark-workouts") as HTMLButtonElement;

    buttonAddWorkouts.addEventListener("click", () => {
        const sectionAddWorkouts = document.querySelector("#section-container-addition-workouts") as HTMLDivElement;
        sectionAddWorkouts.classList.add("show")
    });
}

function exitSectionAddIWorkouts() {
    const exitTheSection = document.querySelector(".exit-the-section") as HTMLDivElement;
    const sectionAddItems = document.querySelectorAll<HTMLDivElement>(".section-container-addition-items");
    exitTheSection.addEventListener("click", () => {
        sectionAddItems.forEach((section) => section.classList.remove("show"));
    });
    window.addEventListener("keyup", (e) => {
        if (e.key === "Escape")
            sectionAddItems.forEach((section) => section.classList.remove("show"))
    });
};

export function sectionWorkouts() {
    openSectionAddWorkouts();
    exitSectionAddIWorkouts();
    showBoxActionInformation();
};