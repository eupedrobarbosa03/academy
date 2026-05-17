import { dashboard } from "./dashboard.js";
import { Category } from "./dom-box-category-utils.js";
import { academyRegex } from "./regex.js";
import { Utils } from "./utils.js";
import { storage } from "./storage.js";
class Workout {
    inputStudent;
    instructorSelected;
    inputWorkout;
    dateSelected;
    timeSelected;
    constructor() {
        this.inputStudent = document.querySelector("#input-student-name-workout");
        this.instructorSelected = document.querySelector("#list-instructors");
        this.inputWorkout = document.querySelector("#input-workout-name");
        this.dateSelected = document.querySelector("#input-workout-date");
        this.timeSelected = document.querySelector("#option-time-workout");
    }
    ;
    validations(inputValue, className, id) {
        const workouts = storage.get("workouts") || [];
        return {
            student: () => {
                if (!inputValue.match(academyRegex.name)) {
                    return Utils.showError(className, id, `Nome inválido. Tente novamente...`);
                }
                ;
                Utils.hideError();
                const students = storage.get("students") || [];
                const findStudent = students.find((student) => student.name.toLowerCase() === inputValue.toLowerCase());
                if (!findStudent)
                    return Utils.showError(className, id, `Aluno não encontrado...`);
                Utils.hideError();
                return true;
            },
            instructor: () => {
                if (!inputValue) {
                    return Utils.showError(className, id, `Instrutor indefinido.`);
                }
                Utils.hideError();
                return true;
            },
            workout: () => {
                if (!inputValue.match(academyRegex.workout)) {
                    return Utils.showError(className, id, "Nome de treino inválido...");
                }
                Utils.hideError();
                return true;
            },
            date: () => {
                if (!inputValue)
                    return Utils.showError(className, id, "Data indefinida");
                Utils.hideError();
                return true;
            },
            time: (date, instructor) => {
                const instructorWorkout = workouts.filter((workout) => workout.instructor === instructor);
                const avaiableDate = instructorWorkout.filter((workout) => {
                    if (workout.date === date && workout.time === inputValue)
                        return workout;
                });
                if (avaiableDate.length !== 0) {
                    Utils.showError(className, id, "Horário ocupado.");
                    return false;
                }
                Utils.hideError();
                return true;
            }
        };
    }
    create() {
        const buttonMark = document.querySelector(".button-save-workout");
        this.inputStudent.addEventListener("input", () => {
            this.validations(this.inputStudent.value, "message-error-student-name-workout", this.inputStudent.id).student();
        });
        this.instructorSelected.addEventListener("input", () => {
            this.validations(this.instructorSelected.value, "message-error-option-instructor", this.instructorSelected.id).instructor();
        });
        this.inputWorkout.addEventListener("input", () => {
            this.validations(this.inputWorkout.value, "message-error-workout-name", this.inputWorkout.id).workout();
        });
        this.dateSelected.addEventListener("input", () => {
            this.validations(this.dateSelected.value, "message-error-date-workout", this.dateSelected.id).date();
        });
        this.timeSelected.addEventListener("input", () => {
            this.validations(this.timeSelected.value, "message-error-time-workout", this.timeSelected.id).time(this.dateSelected.value, this.instructorSelected.value);
        });
        buttonMark.addEventListener("click", () => {
            if (!this.validations(this.inputStudent.value, "message-error-student-name-workout", this.inputStudent.id).student())
                return;
            if (!this.validations(this.instructorSelected.value, "message-error-option-instructor", this.instructorSelected.id).instructor())
                return;
            if (!this.validations(this.inputWorkout.value, "message-error-workout-name", this.inputWorkout.id).workout())
                return;
            if (!this.validations(this.dateSelected.value, "message-error-date-workout", this.dateSelected.id).date())
                return;
            if (!this.validations(this.timeSelected.value, "message-error-time-workout", this.timeSelected.id).time(this.dateSelected.value, this.instructorSelected.value))
                return;
            const workoutsDOM = document.querySelector(".workouts");
            const box = document.createElement("div");
            box.classList.add("box-workout");
            box.innerHTML = new Category().workout(this.inputStudent.value, this.instructorSelected.value, this.inputWorkout.value, this.dateSelected.value, this.timeSelected.value);
            workoutsDOM.appendChild(box);
            storage.add({
                student: this.inputStudent.value,
                instructor: this.instructorSelected.value,
                workout: this.inputWorkout.value,
                date: this.dateSelected.value,
                time: this.timeSelected.value
            }, "workouts");
            alert(`Treino adicionado com sucesso!`);
            dashboard.update("create").workouts();
            new Category().clearForRederingToStorage("box-workout");
            storage.dom().workout();
            Utils.clearnInputs();
        });
    }
    ;
    conclude() {
        document.body.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("icon-conclude-workout")) {
                const targetIndex = target.closest(".box-workout");
                if (!targetIndex)
                    return;
                const studentName = targetIndex.querySelector(".info-student-workout");
                const workoutsUpdated = storage.get("workouts");
                if (workoutsUpdated === null)
                    return;
                const workoutStudent = workoutsUpdated.findIndex((workout) => workout.student === studentName.textContent);
                if (workoutStudent === -1)
                    return;
                storage.delete("workouts", workoutStudent);
                targetIndex.remove();
                dashboard.update('conclude').workouts();
                new Category().clearForRederingToStorage("box-workout");
                storage.dom().workout();
            }
        });
    }
    ;
    cancel() {
        document.body.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("icon-cancel-workout")) {
                const targetIndex = target.closest(".box-workout");
                if (!targetIndex)
                    return;
                const studentName = targetIndex.querySelector(".info-student-workout");
                const workoutsUpdated = storage.get("workouts");
                if (workoutsUpdated === null)
                    return;
                const workoutStudent = workoutsUpdated.findIndex((workout) => workout.student === studentName.textContent);
                if (workoutStudent === -1)
                    return;
                storage.delete("workouts", workoutStudent);
                targetIndex.remove();
                dashboard.update('conclude').workouts();
                new Category().clearForRederingToStorage("box-workout");
                storage.dom().workout();
            }
            ;
        });
    }
    ;
}
;
const workout = new Workout();
export class Workouts {
    static actions() {
        workout.create();
        workout.conclude();
        workout.cancel();
        Utils.search("input-search-workouts", "box-workout", "info-for-search");
        new Category().section().actionsBoxInformation("box-workout", ["icon-cancel-workout", "icon-conclude-workout"], ["information-action-conclude", "information-action-cancel"]);
        new Category().section().addition("button-to-mark-workouts", "section-container-addition-workouts");
    }
    ;
}
;
