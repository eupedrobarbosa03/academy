export function menuMobile() {
    const menu = document.querySelector("#menu-navbar") as HTMLDivElement;
    const navbar = document.querySelector(".navbar-container-options") as HTMLDivElement;

    menu.addEventListener("click", () => {
        navbar.classList.toggle("show")
    });;
}