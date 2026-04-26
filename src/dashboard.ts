
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
                const currentNumber = Number(this.students.textContent);
                if (type === "create") {
                    this.students.textContent = `${currentNumber + 1}`;     
                    return;
                }; this.students.textContent = `${currentNumber - 1}`
            },
            instructors: () => {
                const currentNumber = Number(this.instructors.textContent);
                if (type === "create") {
                    this.instructors.textContent = `${currentNumber + 1}`;     
                    return;
                }; this.instructors.textContent = `${currentNumber - 1}`  
            },
            workouts: () => {
                const currentNumberWorkoutsConclude = Number(this.concludeWorkouts.textContent)
                const currentNumberWorkoutsCanceled = Number(this.canceledWorkouts.textContent)
                if (type === "create") {
                    const currentNumber = Number(this.workouts.textContent);
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