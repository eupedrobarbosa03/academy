function showBoxActionInformation() {
    const boxStudent = document.querySelectorAll(".box-student");
    const events = ["mouseover", "mouseout"];
    const iconsButtons = ["icon-remove-student"];
    const containerInformations = [
        "information-action-remove-student"
    ];
    boxStudent.forEach((box) => events.forEach((typeEvent) => {
        box.addEventListener(typeEvent, (e) => {
            const target = e.target;
            iconsButtons.forEach((button) => {
                if (target.classList.contains(button)) {
                    const indexInformation = containerInformations.findIndex((information) => information.includes(`${button.split("-")[1]}`));
                    const indexTarget = target.closest(".box-student");
                    const indexQuery = indexTarget.querySelector(`.${containerInformations[indexInformation]}`);
                    indexQuery.classList.toggle("show");
                }
                ;
            });
        });
    }));
}
;
export function sectionStudents() {
    showBoxActionInformation();
}
;
