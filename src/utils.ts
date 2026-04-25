//Função para fechamento de seções de ações de cadastrar alunos, marcar aulas e editar alunos e instrutores
export function sectionCloseAllActionsOfCategory() {
    const buttonsCloseSection = document.querySelectorAll<HTMLDivElement>(".close-the-section");
    const sections = ["section-container-addition-items", "section-container-edit-items"];

    buttonsCloseSection.forEach((button) => button.addEventListener("click", () => {
        sections.forEach((section) => {
            const querySection = document.querySelectorAll<HTMLDivElement>(`.${section}`);
            querySection.forEach((query) => query.classList.remove("show"))
        })
    }));

    window.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            sections.forEach((section) => {
                const querySection = document.querySelectorAll<HTMLDivElement>(`.${section}`);
                querySection.forEach((query) => query.classList.remove("show"))
            })
        }
    })

};