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
                const currentNumber = Number(this.students.textContent);
                if (type === "create") {
                    this.students.textContent = `${currentNumber + 1}`;
                    return;
                }
                ;
                this.students.textContent = `${currentNumber - 1}`;
            },
            instructors: () => {
                const currentNumber = Number(this.instructors.textContent);
                if (type === "create") {
                    this.instructors.textContent = `${currentNumber + 1}`;
                    return;
                }
                ;
                this.instructors.textContent = `${currentNumber - 1}`;
            },
            workouts: () => {
                const currentNumberWorkoutsConclude = Number(this.concludeWorkouts.textContent);
                const currentNumberWorkoutsCanceled = Number(this.canceledWorkouts.textContent);
                if (type === "create") {
                    const currentNumber = Number(this.workouts.textContent);
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
