import { BoxCategory } from "./dom-box-category-utils.js";
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
    delete(key, index) {
        const storage = this.get(key);
        if (storage === null)
            return;
        storage.splice(index, 1);
        localStorage.setItem(key, JSON.stringify(storage));
    }
    edit(category, key) {
        localStorage.setItem(key, JSON.stringify(category));
    }
    dom() {
        return {
            dashboard: () => {
                const dashboard = this.get("dashboard");
                if (dashboard === null)
                    return;
                const totalWorkouts = document.querySelector("#total-workouts");
                const totalStudents = document.querySelector("#total-students");
                const totalInstructors = document.querySelector("#total-instructors");
                totalWorkouts.textContent = `${dashboard.totalWorkouts}`;
                totalStudents.textContent = `${dashboard.totalStudents}`;
                totalInstructors.textContent = `${dashboard.totalInstructors}`;
            },
            instructor: () => {
                const listOptionsForWorkout = document.querySelector("#list-instructors");
                const instructors = this.get("instructors");
                if (instructors === null)
                    return;
                instructors.forEach((newInstructor) => {
                    const instructorsDOM = document.querySelector(".instructors");
                    const newBoxInstructor = document.createElement("div");
                    newBoxInstructor.classList.add("box-instructor");
                    newBoxInstructor.innerHTML = new BoxCategory().instructor(newInstructor.name, newInstructor.cpf, newInstructor.telephone, newInstructor.specialty);
                    instructorsDOM.appendChild(newBoxInstructor);
                    const option = document.createElement("option");
                    option.textContent = `${newInstructor.name}`;
                    listOptionsForWorkout.appendChild(option);
                });
            }
        };
    }
    ;
}
;
export const storage = new Storage();
