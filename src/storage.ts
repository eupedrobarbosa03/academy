import { Category, InstructorType } from "./interfaces.js";

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
        };
        localStorage.setItem(key, JSON.stringify([]));
    };
};

export type KeysLocalStorage = "dashboard" | "workouts" | "students" | "instructors";

class Storage {
    constructor() {};

    get<T, K extends KeysLocalStorage>(key: K): T | null {
        const storage = localStorage.getItem(key);
        return storage ? JSON.parse(storage) as T : null;
    };

    add<T extends Category, K extends KeysLocalStorage>(category: T, key: K) {
        const storage = this.get<Category[], KeysLocalStorage>(key);
        if (storage === null) return;
        storage.push(category);
        localStorage.setItem(key, JSON.stringify(storage));
    }

    delete<T extends Category, K extends KeysLocalStorage>(key: K, index: number) {
        const storage = this.get<T[], KeysLocalStorage>(key);
        if (storage === null) return;
        storage.splice(index, 1);
        localStorage.setItem(key, JSON.stringify(storage));
    }

    dom() {
        return {
            instructor: () => {
                const instructors = this.get<InstructorType[], KeysLocalStorage>("instructors");
                if (instructors === null) return;
                instructors.forEach((newInstructor) => {
                    const instructorsDOM = document.querySelector(".instructors") as HTMLDivElement;
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
                            Telefone:
                            <span class="informations-instructors-box-instructor">${newInstructor.telephone}</span>
                        </p>
                        <p class="">
                            Especialidade:
                            <span class="informations-instructors-box-instructor">${newInstructor.specialty}</span>
                        </p>
                        <p class="">
                            Status:
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
                    `
                    instructorsDOM.appendChild(newBoxInstructor);
                }); 
            }
        }
    };

};

export const storage = new Storage();