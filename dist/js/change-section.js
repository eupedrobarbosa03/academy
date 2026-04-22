export function changeSection() {
    const sections = document.querySelectorAll("[data-section]");
    const buttons = document.querySelectorAll(".button-option");
    buttons.forEach((button) => button.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("option-selected"));
        button.classList.add("option-selected");
        const buttonId = button.getAttribute("id");
        sections.forEach((section) => {
            section.style.display = 'none';
            buttonId === section.getAttribute("data-section")
                ? section.style.display = 'block'
                : null;
        });
    }));
}
class Section {
    sections;
    buttons;
    constructor() {
        this.sections = document.querySelectorAll("[data-section]");
        this.buttons = document.querySelectorAll(".button-option");
    }
    ;
    change() {
        this.buttons.forEach((button) => button.addEventListener("click", () => {
            this.buttons.forEach((button) => button.classList.remove("option-selected"));
            button.classList.add("option-selected");
            const id = button.getAttribute("id");
            this.sections.forEach((section) => {
                section.style.display = 'none';
                if (id === section.getAttribute("data-section"))
                    section.style.display = 'block';
            });
        }));
    }
    ;
}
;
