import { showInfo } from "./main.js";
import { boxError } from "./main.js";
import { studentInputs } from "./inputs.js";
import { cleanInputs } from "./main.js";
import { numbersString } from "./main.js";
import { listStudent } from "./main.js";


export const registerStudent = {
    students: []
}

export class Student {
    constructor(name, age, focus, typeBenefit, weight) {
        this.name = String(name);
        this.age = Number(age);
        this.focus = String(focus);
        this.typeBenefit = String(typeBenefit);
        this.weight = Number(weight)
        this.typesBenefit = {
            normal: {
                type: "normal",
                price: 100
            },
            hard: {
                type: "hard",
                price: 400
            }
        }
    }

    inputsValidations() {
    
        const ageMinimum = 10;
    
        if (!this.name || this.name.trim() === "") {
            showInfo("Necessary insert name!", "red");
            boxError(studentInputs.name, "add", "box-error");
            return;
        }
    
    
        for (let letter of this.name) {
            if (numbersString().includes(letter)) {
                showInfo("Name cannot have numbers!", "red");
                boxError(studentInputs.name, "add", "box-error");
                return;
            }
        }
    
        boxError(studentInputs.name, "remove", "box-error");
    
        if (!this.age) {
            showInfo("Necessary insert age!", "red");
            boxError(studentInputs.age, "add", "box-error");
            return;
        }
    
        if (this.age < ageMinimum) {
            showInfo(`Necessary age bigger ${ageMinimum} years!`, "red");
            boxError(studentInputs.age, "add", "box-error");
            return;
        }
    
        boxError(studentInputs.age, "remove", "box-error")
    
        if (!this.focus || this.focus.trim() === "") {
            showInfo("Necessary insert focus!", "red");
            boxError(studentInputs.focus, "add", "box-error");
            return;
        }
    
        for (let letter of this.focus) {
            if (numbersString().includes(letter)) {
                showInfo("Specialty cannot have numbers!", "red");
                boxError(studentInputs.focus, "add", "box-error");
                return;
            }
        }
    
        boxError(studentInputs.focus, "remove", "box-error");
    
        if (!this.typeBenefit || this.typeBenefit.trim() === "") {
            showInfo("Necessary insert type Benefit!", "red");
            boxError(studentInputs.typeBenefit, "add", "box-error");
            return;
        }
    
        for (let number of this.typeBenefit) {
            if (numbersString().includes(number)) {
                showInfo("Type Benefit invalid!", "red");
                boxError(studentInputs.typeBenefit, "add", "box-error");
                return; 
            }
        }

        let existingBenefit = false;

        Object.values(this.typesBenefit).forEach((t) => {
            if (this.typeBenefit.trim().toLowerCase() === t.type) {
                existingBenefit = true;
            }
        })

        if (!existingBenefit) {
            showInfo("Benefit not existing", "red");
            boxError(studentInputs.typeBenefit, "add", "box-error");
            return;
        } 

        boxError(studentInputs.typeBenefit, "remove", "box-error");

        if (this.weight < 0 || !this.weight) {
            showInfo("Weight invalid!");
            boxError(studentInputs.weight, "add", "box-error");
            return;
        }

        boxError(studentInputs.weight, "remove", "box-error");

        return true;

    }

    toAdd() {

        let existingStudent = false;

        for (let i = 0; i < registerStudent.students.length; i++) {
            if (this.name.toLowerCase() === registerStudent.students[i].Name.toLowerCase()) {
                existingStudent = true;
            }
        }

        if (existingStudent) {
            showInfo("Existing Student!", "red");
            boxError(studentInputs.name, "add", "box-error");
            return;
        }

        existingStudent = false;

        if (!this.inputsValidations()) {
            return;
        }

        showInfo("Student register finished!", "green");
        cleanInputs(studentInputs);

        setTimeout(() => {
            showInfo("", null);
        }, 1500);

        registerStudent.students.push({
            Name: this.name,
            Age: this.age,
            Focus: this.focus,
            TypeBenefit: this.typeBenefit,
            Weight: this.weight
        });

        const id = this.name.toLowerCase().replace(" ", "_")

        const template = 
        `
            <li data-id="${id}">
                <p class="first-value-list"><span>Name - </span>${this.name}</p>
                <div>
                    <p class="second-value-list"><span>Focus - </span>${this.focus}</p>
                    <p class="third-value-list"><span>Weight - </span>${this.weight.toFixed(1)}</p>
                </div>
            </li>
        `;

        const parser = new DOMParser();
        const templateHtml = parser.parseFromString(template, "text/html");
        const li = templateHtml.querySelector("li");
        listStudent.appendChild(li);

    }

    toUpdate() {
        if (!this.inputsValidations()) {
            return;
        }

        for (let i = 0; i < registerStudent.students.length; i++) {

            if (this.name.toLowerCase() === registerStudent.students[i].Name.toLowerCase()) {

                const newListStudent = listStudent.querySelectorAll("li");

                newListStudent.forEach((list) => {

                    const targetId = this.name.toLowerCase().replace(" ", "_");

                    if (list.getAttribute("data-id") === targetId) {
                        list.querySelector(".first-value-list").innerHTML = `<span>Name - </span>${this.name}`
                        list.querySelector("div").innerHTML = 
                        `
                            <p class="second-value-list"><span>Focus - </span>${this.focus}</p>
                            <p class="third-value-list"><span>Weight - </span>${this.weight.toFixed(1)}</p>
                        `
                    }

                })

                registerStudent.students[i].Focus = this.focus;
                registerStudent.students[i].Weight = this.weight;

                showInfo("Student update finished!", "green");
                cleanInputs(studentInputs);

                setTimeout(() => {
                    showInfo("", null)
                }, 1500)

                return;
            }
        }

        showInfo("Student don't exist", "red");
    
    }

    delete() {

        if (!this.name || this.name.trim() === "") {
            showInfo("Necessary insert name!", "red");
            boxError(studentInputs.name, "add", "box-error");
            return;
        }
    
    
        for (let letter of this.name) {
            if (numbersString().includes(letter)) {
                showInfo("Name cannot have numbers!", "red");
                boxError(studentInputs.name, "add", "box-error");
                return;
            }
        }
    
        boxError(studentInputs.name, "remove", "box-error");

        for (let i = 0; i < registerStudent.students.length; i++) {

            if (this.name.toLowerCase() === registerStudent.students[i].Name.toLowerCase()) {

                const newListStudent = listStudent.querySelectorAll("li");

                newListStudent.forEach((list) => {

                    const targetId = this.name.toLowerCase().replace(" ", "_");

                    if (list.getAttribute("data-id") === targetId) {
                        list.classList.add("remove");
                    }


                });

                registerStudent.students.splice(i, 1);

                showInfo("Student removed with sucess!", "green");
                cleanInputs(studentInputs);
            
                return;

            }
        }
        showInfo("Student don't exist", "red");
    }
}
