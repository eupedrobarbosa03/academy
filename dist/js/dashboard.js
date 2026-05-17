import { storage } from "./storage.js";
class Dashboard {
    students;
    instructors;
    workouts;
    constructor() {
        this.students = document.querySelector("#total-students");
        this.instructors = document.querySelector("#total-instructors");
        this.workouts = document.querySelector("#total-workouts");
    }
    ;
    update(type) {
        return {
            students: () => {
                const dashboard = storage.get("dashboard");
                const currentNumber = +this.students.textContent;
                const currentStats = document.querySelector("#stats-students-total");
                currentStats.removeAttribute("class");
                if (type === "create") {
                    this.students.textContent = `${currentNumber + 1}`;
                    currentStats.setAttribute("class", "fa-solid fa-caret-up");
                    if (dashboard)
                        dashboard.totalStudents += 1;
                }
                else {
                    this.students.textContent = `${currentNumber - 1}`;
                    currentStats.setAttribute("class", "fa-solid fa-caret-down");
                    if (dashboard)
                        dashboard.totalStudents -= 1;
                }
                localStorage.setItem("dashboard", JSON.stringify(dashboard));
            },
            instructors: () => {
                const dashboard = storage.get("dashboard");
                const currentNumber = +this.instructors.textContent;
                const currentStats = document.querySelector("#stats-instructors-total");
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
                const dashboard = storage.get("dashboard");
                const currentNumber = +this.workouts.textContent;
                const currentStats = document.querySelector("#stats-workouts-total");
                currentStats.removeAttribute("class");
                if (type === "create") {
                    this.workouts.textContent = `${currentNumber + 1}`;
                    currentStats.setAttribute("class", "fa-solid fa-caret-up");
                    if (dashboard)
                        dashboard.totalWorkouts += 1;
                }
                else {
                    this.workouts.textContent = `${currentNumber + 1}`;
                    currentStats.setAttribute("class", "fa-solid fa-caret-down");
                    if (dashboard)
                        dashboard.totalWorkouts -= 1;
                }
                localStorage.setItem("dashboard", JSON.stringify(dashboard));
            }
        };
    }
    ;
}
;
export const dashboard = new Dashboard();
