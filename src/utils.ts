//Função para fechamento de seções de ações de cadastrar alunos, marcar aulas e editar alunos e instrutores

export class Utils {
    static closeAllSection(changeSection?: boolean) {
        const buttonsCloseSection = document.querySelectorAll<HTMLDivElement>(".close-the-section");
        const sections = ["section-container-addition-items", "section-container-edit-items"];

        if (!changeSection) {
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

        sections.forEach((section) => {
            const query = document.querySelectorAll<HTMLDivElement>(`.${section}`);
            query.forEach((q) => q.classList.remove("show"));
        })

    };

    static showError(id: string, idBoxInput: string,  message: string) {
        const indexError = document.querySelector(`#${id}`) as HTMLParagraphElement;
        const boxInputError = document.querySelector(`#${idBoxInput}`) as HTMLInputElement;     
        indexError.textContent = `${message}`;
        indexError.classList.add("show-error");
        boxInputError.classList.add("box-input-error");
    };

    static hideError() {
        const messagesError = document.querySelectorAll<HTMLParagraphElement>(".message-error");
        const inputs = document.querySelectorAll<HTMLInputElement>("input");
        const selects = document.querySelectorAll<HTMLSelectElement>("select");
        messagesError.forEach((message) => {
            message.textContent = '';
            message.classList.remove("show-error")
        });
        inputs.forEach((input) => input.classList.remove("box-input-error"));
        selects.forEach((select) => select.classList.remove("box-input-error"));
    };


    static clearnInputs() {
        const inputs = document.querySelectorAll<HTMLInputElement>("input");
        inputs.forEach((input) => input.value = '');
    };

    static search(inputSearchID: string, classNameBoxCategory: string, valueForSearch: string) {
        const inputSearch = document.querySelector(`#${inputSearchID}`) as HTMLInputElement;
        inputSearch.addEventListener("input", () => {
            const box = document.querySelectorAll<HTMLDivElement>(`.${classNameBoxCategory}`);
            const instructorsInformations = document.querySelectorAll<HTMLDivElement>(`.${valueForSearch}`);
            if (!inputSearch.value) box.forEach((box) => box.classList.remove("hide"));
            let listNotHide: HTMLDivElement[] = [];
            instructorsInformations.forEach((information) => {
                if (inputSearch.value.trim() === "" || !inputSearch.value) return;
                if (information.textContent.toLowerCase().includes(inputSearch.value.toLowerCase())) {
                    box.forEach((box) => box.classList.add("hide"));
                    const index = information.parentNode?.parentNode?.parentNode as HTMLDivElement;
                    listNotHide.push(index)
                    listNotHide.forEach((box) => box.classList.remove("hide"));
                }
            });
        })
    };

}
