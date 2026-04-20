export function exitSectionAddItems() {
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
