function showBoxActionInformation() {
    const boxWorkout = document.querySelectorAll(".box-workout");
    const events = ["mouseover", "mouseout"];
    const iconsButtons = ["icon-cancel-workout", "icon-check-workout"];
    const containerInformations = [
        "information-action-check",
        "information-action-cancel"
    ];
    boxWorkout.forEach((workout) => {
        events.forEach((typeEvent) => {
            workout.addEventListener(typeEvent, (e) => {
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
        });
    });
}
;
function openSectionAddWorkouts() {
    const buttonAddWorkouts = document.querySelector(".button-to-mark-workouts");
    buttonAddWorkouts.addEventListener("click", () => {
        const sectionAddWorkouts = document.querySelector("#section-container-addition-workouts");
        sectionAddWorkouts.classList.add("show");
    });
}
function exitSectionAddIWorkouts() {
    const exitTheSection = document.querySelector(".exit-the-section");
    const sectionAddItems = document.querySelectorAll(".section-container-addition-items");
    exitTheSection.addEventListener("click", () => {
        sectionAddItems.forEach((section) => section.classList.remove("show"));
    });
    window.addEventListener("keyup", (e) => {
        if (e.key === "Escape")
            sectionAddItems.forEach((section) => section.classList.remove("show"));
    });
}
;
export function sectionWorkouts() {
    openSectionAddWorkouts();
    exitSectionAddIWorkouts();
    showBoxActionInformation();
}
;
