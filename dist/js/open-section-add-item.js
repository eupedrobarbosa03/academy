export function openSectionAddItems() {
    const buttonAddWorkouts = document.querySelector(".button-to-mark-workouts");
    buttonAddWorkouts.addEventListener("click", () => {
        const sectionAddWorkouts = document.querySelector("#section-container-addition-workouts");
        sectionAddWorkouts.classList.add("show");
    });
}
