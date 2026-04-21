const buttonCheckWorkout = document.querySelectorAll<HTMLDivElement>(".icon-check-workout")

export function checkWorkout() {
    const boxWorkout = document.querySelectorAll<HTMLDivElement>(".box-workout");
    const events = ["mouseover", "mouseout"]
    boxWorkout.forEach((workout) => {
        events.forEach((typeEvent) => {
            workout.addEventListener(typeEvent, (e) => {
                const target = e.target as HTMLDivElement;
                if (target.classList.contains("icon-check-workout")) {
                    const indexBoxWorkout = target.closest(".box-workout") as HTMLDivElement;
                    const indexBoxInformation = indexBoxWorkout.querySelector(".information-action-check") as HTMLDivElement;
                    indexBoxInformation.classList.toggle("show")
                };
            })
        })
    })
};