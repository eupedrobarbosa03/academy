import { showInfo } from "./main.js";
import { boxError } from "./main.js";
import { workoutsInputs } from "./inputs.js";
import { cleanInputs } from "./main.js";
import { numbersString } from "./main.js";
import { listWorkouts } from "./main.js";
import { registerStudent } from "./students.js";
import { register } from "./instructors.js";


export const workouts = {
    workouts: []
}

export class Workout {
    constructor(nameInstructor, nameStudent, workoutTime, workoutDay) {
        this.nameInstructor = String(nameInstructor);
        this.nameStudent = String(nameStudent);
        this.workoutTime = String(workoutTime);
        this.workoutDay = String(workoutDay);
    }

    inputsValidations() {

        let existingInstructor = false;
        let existingStudent = false;

        for (let i = 0; i < register.instructors.length; i++ ) {
            if (this.nameInstructor.toLowerCase() === register.instructors[i].Name.toLowerCase()) {
                existingInstructor = true;
            }
        }

        for (let i = 0; i < registerStudent.students.length; i++) {
            if (this.nameStudent.toLowerCase() === registerStudent.students[i].Name.toLowerCase()) {
                existingStudent = true;
            }
        }

        if (!existingInstructor) {
            showInfo("This instructor don't exist!", "red");
            boxError(workoutsInputs.nameInstructor, "add", "box-error");
            return;
        }

        boxError(workoutsInputs.nameInstructor, "remove", "box-error");

        if (!existingStudent) {
            showInfo("This student don't exist!", "red");
            boxError(workoutsInputs.nameStudent, "add", "box-error");
            return;
        }

        boxError(workoutsInputs.nameStudent, "remove", "box-error");

        if (!this.nameInstructor || this.nameInstructor.trim() === "") {
            showInfo("Necessary insert name Instructor!", "red");
            boxError(workoutsInputs.nameInstructor, "add", "box-error");
            return;
        }

        for (let letter of this.nameInstructor) {
            if (numbersString().includes(letter)) {
                showInfo("Name cannot have numbers!", "red");
                boxError(workoutsInputs.nameInstructor, "add", "box-error");
                return;
            }
        }

        boxError(workoutsInputs.nameInstructor, "remove", "box-error");

        if (!this.nameStudent || this.nameStudent.trim() === "") {
            showInfo("Necessary insert name Student!", "red");
            boxError(workoutsInputs.nameStudent, "add", "box-error");
            return;
        }

        for (let letter of this.nameStudent) {
            if (numbersString().includes(letter)) {
                showInfo("Name cannot have numbers!", "red");
                boxError(workoutsInputs.nameStudent, "add", "box-error");
                return;
            }
        }

        boxError(workoutsInputs.nameInstructor, "remove", "box-error");

        const charResquestTime = ":";

        if (this.workoutTime.length !== 5 && !this.workoutDay.includes(charResquestTime)) {
            showInfo("Time invalid! Format: hh:mm", "red");
            boxError(workoutsInputs.time, "add", "box-error");
            return;
        };

        boxError(workoutsInputs.time, "remove", "box-error");

        const days = [
            "segunda-feira",
            "terça-feira",
            "quarta-feira",
            "quinta-feira",
            "sexta-feira", 
            "sábado",
            "domingo"
        ];

        this.workoutDay = this.workoutDay.toLowerCase().trim();

        if (!days.includes(this.workoutDay)) {
            showInfo("Day invalid!", "red");
            boxError(workoutsInputs.day, "add", "box-error");
            return;
        }

        boxError(workoutsInputs.day, "remove", "box-error");

        return true;

    }

    toAdd() {

        if (!this.inputsValidations()) {
            return;
        }
        
        showInfo("Workout register with sucess!", "green");
        cleanInputs(workoutsInputs);

        setTimeout(() => {
            showInfo("", null);
        }, 1500);

        workouts.workouts.push({
            NameInstructor: this.nameInstructor,
            NameStudent: this.nameStudent,
            WorkoutTime: this.workoutTime,
            WorkoutDay: this.workoutDay
        });

        const template = 
        `
            <li>
                <div>
                    <p class="first-value-list"><span>Instructor - </span>${this.nameInstructor}</p>
                    <p class="first-value-list-2"><span>Student - </span>${this.nameStudent}</p>
                </div>
                <div>
                    <p class="second-value-list"><span>Day - </span>${this.workoutDay}</p>
                    <p class="third-value-list"><span>Time - </span>${this.workoutTime}</p>
                </div>
            </li>
        `;

        const parser = new DOMParser();
        const templateHtml = parser.parseFromString(template, "text/html");
        const li = templateHtml.querySelector("li");
        listWorkouts.appendChild(li);

    }

}
