const keysLocalStorage = ["dashboard", "workouts", "students", "instructors"];
for (const key of keysLocalStorage) {
    if (!localStorage.getItem(key)) {
        if (key === "dashboard") {
            localStorage.setItem(key, JSON.stringify({
                totalWorkouts: 0,
                totalStudents: 0,
                totalInstructors: 0
            }));
            continue;
        }
        ;
        localStorage.setItem(key, JSON.stringify([]));
    }
    ;
}
;
class Storage {
    constructor() { }
    ;
    get(key) {
        const storage = localStorage.getItem(key);
        return storage ? JSON.parse(storage) : null;
    }
    ;
    add(category, key) {
        const storage = this.get(key);
        if (storage === null)
            return;
        storage.push(category);
        localStorage.setItem(key, JSON.stringify(storage));
    }
    dom() {
        return {
            instructor: () => {
                alert("teste");
                const instructors = this.get("instructors");
                if (instructors === null)
                    return;
                instructors.forEach((newInstructor) => {
                    const instructorsDOM = document.querySelector(".instructors");
                    const newBoxInstructor = document.createElement("div");
                    newBoxInstructor.classList.add("box-instructor");
                    newBoxInstructor.innerHTML =
                        `
                    <div class="container-informations-instructors">
                        <p class="">
                            Instrutor:
                            <span class="informations-instructors-box-instructor">${newInstructor.name}</span>
                        </p>
                        <p class="">
                            CPF:
                            <span class="informations-instructors-box-instructor info-cpf-instructor">${newInstructor.cpf}</span>
                        </p>
                        <p class="">
                            Telefone
                            <span class="informations-instructors-box-instructor">${newInstructor.telephone}</span>
                        </p>
                        <p class="">
                            Especialidade
                            <span class="informations-instructors-box-instructor">${newInstructor.specialty}</span>
                        </p>
                        <p class="">
                            Status
                            <span class="informations-instructors-box-instructor">Ativo</span>
                        </p>
                    </div>
                    <div class="container-actions-box-instructors">
                        <i class="fa-solid fa-pen-to-square icon-edit-instructor"></i>
                        <i class="fa-solid fa-trash icon-remove-instructor"></i>
                        <div class="information-action-edit-instructor information-action">
                            <p class="">Editar</p>
                        </div>
                        <div class="information-action-remove-instructor information-action">
                            <p class="">Remover</p>
                        </div>
                    </div>
                    `;
                    instructorsDOM.appendChild(newBoxInstructor);
                });
            }
        };
    }
    ;
}
;
export const storage = new Storage();
