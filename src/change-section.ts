const sections = document.querySelectorAll<HTMLDivElement>("[data-section]");
const buttons = document.querySelectorAll<HTMLDivElement>(".button-option");

buttons.forEach((button) => button.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("option-selected"));
    button.classList.add("option-selected");
    const buttonId = button.getAttribute("id");
    sections.forEach((section) => {
        section.style.display = 'none';
        buttonId === section.getAttribute("data-section")
        ? section.style.display = 'block'
        : null;
    })
}))