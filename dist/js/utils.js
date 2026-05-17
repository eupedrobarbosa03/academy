//Função para fechamento de seções de ações de cadastrar alunos, marcar aulas e editar alunos e instrutores
export class Utils {
    static closeAllSection(changeSection) {
        const buttonsCloseSection = document.querySelectorAll(".close-the-section");
        const sections = ["section-container-addition-items", "section-container-edit-items"];
        if (!changeSection) {
            buttonsCloseSection.forEach((button) => button.addEventListener("click", () => {
                this.hideError();
                this.clearnInputs();
                sections.forEach((section) => {
                    const querySection = document.querySelectorAll(`.${section}`);
                    querySection.forEach((query) => query.classList.remove("show"));
                });
            }));
            window.addEventListener("keyup", (e) => {
                if (e.key === "Escape") {
                    this.hideError();
                    this.clearnInputs();
                    sections.forEach((section) => {
                        const querySection = document.querySelectorAll(`.${section}`);
                        querySection.forEach((query) => query.classList.remove("show"));
                    });
                }
            });
        }
        ;
        sections.forEach((section) => {
            const query = document.querySelectorAll(`.${section}`);
            query.forEach((q) => q.classList.remove("show"));
        });
    }
    ;
    static showError(id, idBoxInput, message) {
        const indexError = document.querySelector(`#${id}`);
        const boxInputError = document.querySelector(`#${idBoxInput}`) || HTMLSelectElement;
        indexError.textContent = `${message}`;
        indexError.classList.add("show-error");
        boxInputError.classList.add("box-input-error");
    }
    ;
    static hideError() {
        const messagesError = document.querySelectorAll(".message-error");
        const inputs = document.querySelectorAll("input");
        const selects = document.querySelectorAll("select");
        messagesError.forEach((message) => {
            message.textContent = '';
            message.classList.remove("show-error");
        });
        inputs.forEach((input) => input.classList.remove("box-input-error"));
        selects.forEach((select) => select.classList.remove("box-input-error"));
    }
    ;
    static clearnInputs() {
        const inputs = document.querySelectorAll("input");
        inputs.forEach((input) => input.value = '');
        const planSelected = document.querySelector("#student-plan-for-register");
        const listInstructores = document.querySelector("#list-instructors");
        const optionsTime = document.querySelector("#option-time-workout");
        planSelected.value = 'basic';
        optionsTime.value = '08:00';
        listInstructores.value = '';
    }
    ;
    static search(inputSearchID, classNameBoxCategory, valueForSearch) {
        const inputSearch = document.querySelector(`#${inputSearchID}`);
        inputSearch.addEventListener("input", () => {
            const box = document.querySelectorAll(`.${classNameBoxCategory}`);
            const instructorsInformations = document.querySelectorAll(`.${valueForSearch}`);
            if (!inputSearch.value)
                box.forEach((box) => box.classList.remove("hide"));
            let listNotHide = [];
            instructorsInformations.forEach((information) => {
                if (inputSearch.value.trim() === "" || !inputSearch.value)
                    return;
                if (information.textContent.toLowerCase().includes(inputSearch.value.toLowerCase())) {
                    box.forEach((box) => box.classList.add("hide"));
                    const index = information.parentNode?.parentNode?.parentNode;
                    listNotHide.push(index);
                    listNotHide.forEach((box) => box.classList.remove("hide"));
                }
            });
        });
    }
    ;
}
