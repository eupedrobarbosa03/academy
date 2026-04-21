function checkAndCancelWorkout() {
    const boxWorkout = document.querySelectorAll(".box-workout");
    const events = ["mouseover", "mouseout"];
    boxWorkout.forEach((workout) => {
        events.forEach((typeEvent) => {
            workout.addEventListener(typeEvent, (e) => {
                const target = e.target;
                if (target.classList.contains("icon-check-workout")) {
                    const indexBoxWorkout = target.closest(".box-workout");
                    const indexBoxInformation = indexBoxWorkout.querySelector(".information-action-check");
                    indexBoxInformation.classList.toggle("show");
                }
                else if (target.classList.contains("icon-cancel-workout")) {
                    const indexBoxWorkout = target.closest(".box-workout");
                    const indexBoxInformation = indexBoxWorkout.querySelector(".information-action-cancel");
                    indexBoxInformation.classList.toggle("show");
                }
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
    checkAndCancelWorkout();
}
;
