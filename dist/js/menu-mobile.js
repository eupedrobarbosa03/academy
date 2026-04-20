export function menuMobile() {
    const menu = document.querySelector("#menu-navbar");
    const navbar = document.querySelector(".navbar-container-options");
    menu.addEventListener("click", () => {
        navbar.classList.toggle("show");
    });
    ;
}
