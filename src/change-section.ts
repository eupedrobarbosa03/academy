class Section {
    private sections;
    private buttons;
    constructor() {
        this.sections = document.querySelectorAll<HTMLDivElement>("[data-section]");
        this.buttons = document.querySelectorAll<HTMLDivElement>(".button-option"); 
    };

    change() {
        this.buttons.forEach((button) => button.addEventListener("click", () => {
            this.buttons.forEach((button) => button.classList.remove("option-selected"));
            button.classList.add("option-selected");
            const id = button.getAttribute("id");
            this.sections.forEach((section) => {
                section.style.display = 'none';
                if (id === section.getAttribute("data-section")) section.style.display = 'block'
                
            })
        }))
    };
};

export const section = new Section();

