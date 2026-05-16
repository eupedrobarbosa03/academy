import { Category } from "./dom-box-category-utils.js";
import { DashboardType, InstructorType, StudentType } from "./interfaces.js";


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

    add<T, K extends KeysLocalStorage>(category: T, key: K) {
        const storage = this.get<T[], KeysLocalStorage>(key);
        if (storage === null) return;
        storage.push(category);
        localStorage.setItem(key, JSON.stringify(storage));
    }

    delete<T, K extends KeysLocalStorage>(key: K, index: number) {
        const storage = this.get<T[], KeysLocalStorage>(key);
        if (storage === null) return;
        storage.splice(index, 1);
        localStorage.setItem(key, JSON.stringify(storage));
    }

    edit<T, K extends KeysLocalStorage>(category: T, key: K) {
        localStorage.setItem(key, JSON.stringify(category));
    }

    dom() {
        return {
            dashboard: () => {
                const dashboard = this.get<DashboardType, KeysLocalStorage>("dashboard");
                if (dashboard === null) return;
                const totalWorkouts = document.querySelector("#total-workouts") as HTMLParagraphElement;
                const totalStudents = document.querySelector("#total-students") as HTMLParagraphElement;
                const totalInstructors = document.querySelector("#total-instructors") as HTMLParagraphElement;
                totalWorkouts.textContent = `${dashboard.totalWorkouts}`;
                totalStudents.textContent = `${dashboard.totalStudents}`;
                totalInstructors.textContent = `${dashboard.totalInstructors}`;
            },
            student: () => {
                const students = this.get<StudentType[], KeysLocalStorage>("students");
                if (students === null) return;
                students.forEach((student) => {
                    const studentsDOM = document.querySelector(".students") as HTMLDivElement;
                    const newBoxStudent = document.createElement("div");
                    newBoxStudent.classList.add("box-student");
                    newBoxStudent.innerHTML = new Category().student(student.register, student.name, student.cpf, student.telephone, student.plan);
                    studentsDOM.appendChild(newBoxStudent);
                }); 
            },
            instructor: () => {
                const listOptionsForWorkout = document.querySelector("#list-instructors") as HTMLSelectElement;
                const instructors = this.get<InstructorType[], KeysLocalStorage>("instructors");
                if (instructors === null) return;
                instructors.forEach((newInstructor) => {
                    const instructorsDOM = document.querySelector(".instructors") as HTMLDivElement;
                    const newBoxInstructor = document.createElement("div");
                    newBoxInstructor.classList.add("box-instructor");
                    newBoxInstructor.innerHTML = new Category().instructor(newInstructor.name, newInstructor.cpf, newInstructor.telephone, newInstructor.specialty)
                    instructorsDOM.appendChild(newBoxInstructor);
                    const option = document.createElement("option");
                    option.textContent = `${newInstructor.name}`;
                    listOptionsForWorkout.appendChild(option);
                }); 
            }
        }
    };

};

export const storage = new Storage();