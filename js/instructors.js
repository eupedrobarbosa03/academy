import { showInfo } from "./main.js";
import { boxError } from "./main.js";
import { instructorInputs } from "./inputs.js";
import { cleanInputs } from "./main.js";
import { numbersString } from "./main.js";
import { listInstructor } from "./main.js";


export const register = {
    instructors: []
}

export class Instructor {
    constructor(name, age, specialty, telephone) {
        this.name = String(name);
        this.age = Number(age);
        this.specialty = String(specialty);
        this.telephone = String(telephone);
    }

    inputsValidations() {

        const ageMinimum = 18;
    
        if (!this.name || this.name.trim() === "") {
            showInfo("Necessary insert name!", "red");
            boxError(instructorInputs.name, "add", "box-error");
            return;
        }
    
    
        for (let letter of this.name) {
            if (numbersString().includes(letter)) {
                showInfo("Name cannot have numbers!", "red");
                boxError(instructorInputs.name, "add", "box-error");
                return;
            }
        }
    
        boxError(instructorInputs.name, "remove", "box-error");
    
        if (!this.age) {
            showInfo("Necessary insert age!", "red");
            boxError(instructorInputs.age, "add", "box-error");
            return;
        }
    
        if (this.age < ageMinimum) {
            showInfo(`Necessary age bigger ${ageMinimum} years!`, "red");
            boxError(instructorInputs.age, "add", "box-error");
            return;
        }
    
        boxError(instructorInputs.age, "remove", "box-error")
    
        if (!this.specialty || this.specialty.trim() === "") {
            showInfo("Necessary insert specialty!", "red");
            boxError(instructorInputs.specialty, "add", "box-error");
            return;
        }
    
        for (let letter of this.specialty) {
            if (numbersString().includes(letter)) {
                showInfo("Specialty cannot have numbers!", "red");
                boxError(instructorInputs.specialty, "add", "box-error");
                return;
            }
        }
    
        boxError(instructorInputs.specialty, "remove", "box-error");
    
        if (!this.telephone || this.telephone.trim() === "") {
            showInfo("Necessary insert telephone!", "red");
            boxError(instructorInputs.telephone, "add", "box-error");
            return;
        }
    
        for (let number of this.telephone) {
            if (!numbersString().includes(number)) {
                showInfo("Telephone invalid!", "red");
                boxError(instructorInputs.telephone, "add", "box-error");
                return; 
            }
        }
    
        boxError(instructorInputs.telephone, "remove", "box-error");

        return true;

    }

    toAdd() {

        let existingInstructor = false;

        for (let i = 0; i < register.instructors.length; i++) {
            if (this.name.toLowerCase() === register.instructors[i].Name.toLowerCase()) {
                existingInstructor = true;
            }
        }

        if (existingInstructor) {
            showInfo("Existing Instructor!", "red");
            boxError(instructorInputs.name, "add", "box-error");
            return;
        }

        existingInstructor = false;

        if (!this.inputsValidations()) {
            return;
        }

        showInfo("Instructor register finished!", "green");
        cleanInputs(instructorInputs);

        setTimeout(() => {
            showInfo("", null);
        }, 1500);

        register.instructors.push({
            Name: this.name,
            Age: this.age,
            Specialty: this.specialty,
            Telephone: this.telephone
        });

        const id = this.name.toLowerCase().replace(" ", "_");

        const template = 
        `
            <li data-id="${id}">
                <p class="first-value-list"><span>Name - </span>${this.name}</p>
                <p class="second-value-list"><span>Specialty - </span>${this.specialty}</p>
            </li>
        `;

        const parser = new DOMParser();
        const templateHtml = parser.parseFromString(template, "text/html");
        const li = templateHtml.querySelector("li");
        listInstructor.appendChild(li);

    }

    toUpdate() {

        if (!this.inputsValidations()) {
            return;
        }

        for (let i = 0; i < register.instructors.length; i++) {
            if (this.name.toLowerCase() === register.instructors[i].Name.toLowerCase()) {

                const newListInstructor = listInstructor.querySelectorAll("li");

                newListInstructor.forEach((list) => {

                    const targetId = this.name.toLowerCase().replace(" ", "_");

                    if (list.getAttribute("data-id") === targetId) {
                        list.querySelector(".first-value-list").innerHTML = `<span>Name - </span>${this.name}`
                        list.querySelector(".second-value-list").innerHTML = `<span>Specialty - </span>${this.specialty}`
                    }

                })

                register.instructors[i].Specialty = this.specialty;

                showInfo("Instructor update finished!", "green");
                cleanInputs(instructorInputs);

                setTimeout(() => {
                    showInfo("", null)
                }, 1500)

                return;
            }
        }

        showInfo("Instructor don't exist", "red");
    
    }

    delete() {

        if (!this.name || this.name.trim() === "") {
            showInfo("Necessary insert name!", "red");
            boxError(instructorInputs.name, "add", "box-error");
            return;
        }
    
    
        for (let letter of this.name) {
            if (numbersString().includes(letter)) {
                showInfo("Name cannot have numbers!", "red");
                boxError(instructorInputs.name, "add", "box-error");
                return;
            }
        }
    
        boxError(instructorInputs.name, "remove", "box-error");

        for (let i = 0; i < register.instructors.length; i++) {

            if (this.name.toLowerCase() === register.instructors[i].Name.toLowerCase()) {

                const newListInstructor = listInstructor.querySelectorAll("li");

                newListInstructor.forEach((list) => {

                    const targetId = this.name.toLowerCase().replace(" ", "_");

                    if (list.getAttribute("data-id") === targetId) {
                        list.classList.add("remove");
                    }


                });

                register.instructors.splice(i, 1);

                showInfo("Instructor removed with sucess!", "green");
                cleanInputs(instructorInputs);
            
                return;

            }
        }
        showInfo("Instructor don't exist", "red");
    }

}