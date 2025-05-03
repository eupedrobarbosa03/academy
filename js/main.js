import { buttonInstructor, buttonStudent, buttonAdd, buttonUpdate, buttonDelete, buttonViewAll, buttonLeave,  buttonConfirm, buttonWorkouts } from "./buttons.js";
import { instructorInputs, studentInputs, workoutsInputs } from "./inputs.js";
import { Instructor} from "./instructors.js";
import { Student } from "./students.js";
import { Workout } from "./workouts.js";

function displayInput(input, typeDisplay) {
    input.style.display = typeDisplay;
}

function traverseObject(object, typeDisplay) {
    Object.entries(object).forEach(([, input]) => {
        displayInput(input, typeDisplay)
    })
}

export function numbersString() {

    let numbers = [];

    for (let i = 0; i < 10; i++) {
        i = String(i);
        numbers.push(i);
    } 

    return numbers;

}

export function cleanInputs(object) {
    Object.entries(object).forEach(([, input]) => {
        input.value = "";
        input.classList.remove("box-error");
    })
}

export function boxError(object, type, classname) {
    switch(type) {
        case "add":
            object.classList.add(classname) 
            break;
        case "remove":
            object.classList.remove(classname)    
            break;
    }
}

export const messageInfo = document.querySelector("#message-info");

export function showInfo(message, color) {
    messageInfo.classList.add("show-info");
    messageInfo.style.color = color;
    messageInfo.textContent = message;
}

const sectionControl = document.querySelector("#section-control");
const sectionWorkouts = document.querySelector("#section-control-workouts")
const sectionInstructor = document.querySelector("#section-control-instructor");
const sectionStudent = document.querySelector("#section-control-student");
const titleSectionControl = document.querySelector("#title-option-selected");
const sectionViewAll = document.querySelector(".section-view-all");
const sectionContainerViewAllWorkouts = document.querySelector("#section-container-list-all-workouts")
const sectionContainerViewAllInstructor = document.querySelector("#section-container-list-all-instructors")
const sectionContainerViewAllStudent = document.querySelector("#section-container-list-all-students")
export const listInstructor = document.querySelector("#list-instructors");
export const listStudent = document.querySelector("#list-students");
export const listWorkouts = document.querySelector("#list-workouts")

let controlSelected = "";
let typeControl = ""; //initialized with add

buttonWorkouts.addEventListener("click", () => {
    messageInfo.classList.remove("show-info");
    sectionWorkouts.classList.add("show-section-workouts");
    sectionStudent.classList.remove("show-section-student");
    sectionInstructor.classList.remove("show-section-instructor");
    sectionControl.classList.add("show-section");
    titleSectionControl.textContent = "Workouts";
    controlSelected = "Workouts";
    typeControl = "add";
    cleanInputs(instructorInputs);
    cleanInputs(studentInputs);
    cleanInputs(workoutsInputs);
    displayInput(buttonDelete, "none");
    displayInput(buttonUpdate, "none");
})

buttonInstructor.addEventListener("click", () => {
    messageInfo.classList.remove("show-info");
    sectionStudent.classList.remove("show-section-student");
    sectionWorkouts.classList.remove("show-section-workouts");
    sectionInstructor.classList.add("show-section-instructor");
    sectionControl.classList.add("show-section");
    titleSectionControl.textContent = "Instructor";
    controlSelected = "Instructor";
    typeControl = "add"
    cleanInputs(instructorInputs);
    cleanInputs(studentInputs);
    cleanInputs(workoutsInputs);
    displayInput(buttonDelete, "inline");
    displayInput(buttonUpdate, "inline");
})

buttonStudent.addEventListener("click", () => {
    messageInfo.classList.remove("show-info");
    sectionInstructor.classList.remove("show-section-instructor");
    sectionWorkouts.classList.remove("show-section-workouts");
    sectionStudent.classList.add("show-section-student");
    sectionControl.classList.add("show-section");
    titleSectionControl.textContent = "Student";
    controlSelected = "Student";
    typeControl = "add";
    cleanInputs(instructorInputs);
    cleanInputs(studentInputs);
    cleanInputs(workoutsInputs);
    displayInput(buttonDelete, "inline");
    displayInput(buttonUpdate, "inline");
})

buttonInstructor.addEventListener("dblclick", () => {
    sectionControl.classList.remove("show-section");

})

buttonStudent.addEventListener("dblclick", () => {
    sectionControl.classList.remove("show-section");
})

buttonAdd.addEventListener("click", () => {
    messageInfo.classList.remove("show-info")
    buttonConfirm.textContent = "Confirm"
    traverseObject(instructorInputs, "block");
    traverseObject(studentInputs, "block");
    cleanInputs(instructorInputs);
    cleanInputs(studentInputs);
    typeControl = "add";
})

buttonUpdate.addEventListener("click", () => {
    messageInfo.classList.remove("show-info")
    buttonConfirm.textContent = "Update"
    traverseObject(instructorInputs, "block");
    traverseObject(studentInputs, "block");
    cleanInputs(instructorInputs);
    cleanInputs(studentInputs);
    typeControl = "update"
})

buttonDelete.addEventListener("click", () => {
    messageInfo.classList.remove("show-info")
    buttonConfirm.textContent = "Delete";
    traverseObject(instructorInputs, "none");
    traverseObject(studentInputs, "none");
    displayInput(instructorInputs.name, "block");
    displayInput(studentInputs.name, "block");
    cleanInputs(instructorInputs);
    cleanInputs(studentInputs);
    typeControl = "delete"
})

buttonViewAll.addEventListener("click", () => {
    sectionViewAll.classList.add("show-section");
    switch(controlSelected) {
        case 'Instructor':
            sectionContainerViewAllStudent.classList.remove("show");
            sectionContainerViewAllWorkouts.classList.remove("show");
            sectionContainerViewAllInstructor.classList.add("show");
            break;
        case 'Student':
            sectionContainerViewAllStudent.classList.add("show")
            sectionContainerViewAllInstructor.classList.remove("show");
            sectionContainerViewAllWorkouts.classList.remove("show");
            break;
        case 'Workouts':
            sectionContainerViewAllWorkouts.classList.add("show");
            sectionContainerViewAllInstructor.classList.remove("show");
            sectionContainerViewAllStudent.classList.remove("show");
            break;
    }
})

buttonLeave.addEventListener("click", () => {
    sectionViewAll.classList.remove("show-section");
})


buttonConfirm.addEventListener("click", () => {
    switch(controlSelected) {

        case 'Instructor':

            const instructor = new Instructor(instructorInputs.name.value, instructorInputs.age.value, instructorInputs.specialty.value, instructorInputs.telephone.value);

            switch(typeControl) {
                case 'add':
                    instructor.toAdd();
                    break;
                case 'update':
                    instructor.toUpdate();
                    break;
                case 'delete':
                    instructor.delete();
                    break;
            }

            break;
        
        case 'Student':

            const student = new Student(studentInputs.name.value, studentInputs.age.value, studentInputs.focus.value, studentInputs.typeBenefit.value, studentInputs.weight.value);

            switch(typeControl) {
                case 'add':
                    student.toAdd();
                    break;
                case 'update':
                    student.toUpdate();
                    break;
                case 'delete':
                    student.delete();
                    break;
            }
            
            break;
        
        case 'Workouts':

            const workout = new Workout(workoutsInputs.nameInstructor.value, workoutsInputs.nameStudent.value, workoutsInputs.time.value, workoutsInputs.day.value);

            switch(typeControl) {
                case 'add':
                    workout.toAdd();
                    break;
            }
    }
})
