import { storage } from "./storage.js";
class Dashboard {
    students;
    instructors;
    workouts;
    concludeWorkouts;
    canceledWorkouts;
    constructor() {
        this.students = document.querySelector("#total-students");
        this.instructors = document.querySelector("#total-instructors");
        this.workouts = document.querySelector("#total-workouts");
        this.concludeWorkouts = document.querySelector("#total-workouts-conclude");
        this.canceledWorkouts = document.querySelector("#total-workouts-canceled");
    }
    ;
    update(type) {
        return {
            students: () => {
                const currentNumber = +this.students.textContent;
                if (type === "create") {
                    this.students.textContent = `${currentNumber + 1}`;
                    return;
                }
                ;
                this.students.textContent = `${currentNumber - 1}`;
            },
            instructors: () => {
                const dashboard = storage.get("dashboard");
                const currentNumber = +this.instructors.textContent;
                const currentStats = document.querySelector("#stats-instructors-total");
                let increment = false;
                currentStats.removeAttribute("class");
                if (type === "create") {
                    this.instructors.textContent = `${currentNumber + 1}`;
                    currentStats.setAttribute("class", "fa-solid fa-caret-up");
                    if (dashboard)
                        dashboard.totalInstructors += 1;
                }
                else {
                    this.instructors.textContent = `${currentNumber - 1}`;
                    currentStats.setAttribute("class", "fa-solid fa-caret-down");
                    if (dashboard)
                        dashboard.totalInstructors -= 1;
                }
                ;
                localStorage.setItem("dashboard", JSON.stringify(dashboard));
            },
            workouts: () => {
                const currentNumberWorkoutsConclude = +this.concludeWorkouts.textContent;
                const currentNumberWorkoutsCanceled = +this.canceledWorkouts.textContent;
                if (type === "create") {
                    const currentNumber = +this.workouts.textContent;
                    this.workouts.textContent = `${currentNumber + 1}`;
                }
                else if (type === "conclude") {
                    this.concludeWorkouts.textContent = `${currentNumberWorkoutsConclude + 1}`;
                    return;
                }
                ;
                this.canceledWorkouts.textContent = `${currentNumberWorkoutsCanceled + 1}`;
            }
        };
    }
    ;
}
;
export const dashboard = new Dashboard();
