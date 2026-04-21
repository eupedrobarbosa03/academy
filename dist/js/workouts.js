const buttonCheckWorkout = document.querySelectorAll(".icon-check-workout");
export function checkWorkout() {
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
                ;
            });
        });
    });
}
;
