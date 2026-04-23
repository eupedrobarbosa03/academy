//Função para fechamento de seções de ações de cadastrar alunos, marcar aulas e editar alunos e instrutores
export function sectionCloseAllActionsOfCategory() {
    const buttonsCloseSection = document.querySelectorAll<HTMLDivElement>(".close-the-section");
    const sectionsAddCategory = document.querySelectorAll<HTMLDivElement>(".section-container-addition-items");
    const sectionsEditCategory = document.querySelectorAll<HTMLDivElement>(".section-container-edit-items");

    buttonsCloseSection.forEach((button) => button.addEventListener("click", () => {
        sectionsAddCategory.forEach((section) => section.classList.remove("show"));
        sectionsEditCategory.forEach((section) => section.classList.remove("show"))
    }));

    window.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            sectionsAddCategory.forEach((section) => section.classList.remove("show"));
            sectionsEditCategory.forEach((section) => section.classList.remove("show"))
        }
    })

};