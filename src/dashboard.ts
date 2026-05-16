import { storage, KeysLocalStorage } from "./storage.js";
import { DashboardType } from "./interfaces.js";

class Dashboard {
    private students;
    private instructors;
    private workouts;
    private concludeWorkouts;
    private canceledWorkouts;
    constructor() {
        this.students = document.querySelector("#total-students") as HTMLDivElement;
        this.instructors = document.querySelector("#total-instructors") as HTMLDivElement;
        this.workouts = document.querySelector("#total-workouts") as HTMLDivElement;
        this.concludeWorkouts = document.querySelector("#total-workouts-conclude") as HTMLDivElement;
        this.canceledWorkouts = document.querySelector("#total-workouts-canceled") as HTMLDivElement;
    };

    update(type: "create" | "delete" | "conclude" | "cancel") {
        return {
            students: () => {
                const dashboard = storage.get<DashboardType, KeysLocalStorage>("dashboard");
                const currentNumber = +this.students.textContent;
                const currentStats = document.querySelector("#stats-students-total") as HTMLDivElement;

                currentStats.removeAttribute("class");

                if (type === "create") {
                    this.students.textContent = `${currentNumber + 1}`;     
                    currentStats.setAttribute("class", "fa-solid fa-caret-up");
                    if (dashboard) dashboard.totalStudents += 1;
                } else {
                    this.students.textContent = `${currentNumber - 1}`;
                    currentStats.setAttribute("class", "fa-solid fa-caret-down");
                    if (dashboard) dashboard.totalStudents -= 1;
                }

                localStorage.setItem("dashboard", JSON.stringify(dashboard));

            },
            instructors: () => {
                const dashboard = storage.get<DashboardType, KeysLocalStorage>("dashboard");
                const currentNumber = +this.instructors.textContent;
                const currentStats = document.querySelector("#stats-instructors-total") as HTMLDivElement;

                currentStats.removeAttribute("class");
                if (type === "create") {
                    this.instructors.textContent = `${currentNumber + 1}`;
                    currentStats.setAttribute("class", "fa-solid fa-caret-up");
                    if (dashboard) dashboard.totalInstructors += 1;
                } else {
                    this.instructors.textContent = `${currentNumber - 1}`;
                    currentStats.setAttribute("class", "fa-solid fa-caret-down");
                    if (dashboard) dashboard.totalInstructors -= 1;
                };

                localStorage.setItem("dashboard", JSON.stringify(dashboard));

                
            },
            workouts: () => {
                const currentNumberWorkoutsConclude = +this.concludeWorkouts.textContent
                const currentNumberWorkoutsCanceled = +this.canceledWorkouts.textContent
                if (type === "create") {
                    const currentNumber = +this.workouts.textContent;
                    this.workouts.textContent = `${currentNumber + 1}`;
                } else if (type === "conclude") {
                    this.concludeWorkouts.textContent = `${currentNumberWorkoutsConclude + 1}`
                    return;
                }; this.canceledWorkouts.textContent = `${currentNumberWorkoutsCanceled + 1}`
            }
        }
    };
};

export const dashboard = new Dashboard();