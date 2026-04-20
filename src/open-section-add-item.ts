export function openSectionAddItems() {
    const buttonAddWorkouts = document.querySelector(".button-to-mark-workouts") as HTMLButtonElement;

    buttonAddWorkouts.addEventListener("click", () => {
        const sectionAddWorkouts = document.querySelector("#section-container-addition-workouts") as HTMLDivElement;
        sectionAddWorkouts.classList.add("show")
    });
}