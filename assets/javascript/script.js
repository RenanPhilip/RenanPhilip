// Navbar
document.addEventListener("DOMContentLoaded", () => {

    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    // Toggle abr/fecha (evita propagação)
    toggle.addEventListener("click", (e) => {
        menu.classList.toggle("show");
        e.stopPropagation();
    });

    // Fecha ao clicar fora
    document.addEventListener("click", (e) => {
        if (menu.classList.contains("show")) {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                menu.classList.remove("show");
            }
        }
    });

    // Fecha com ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") menu.classList.remove("show");
    });
});

// Name Smooth
document.addEventListener("DOMContentLoaded", () => {
    const alvo = document.querySelector("#nome");
    if (alvo) {
        alvo.scrollIntoView({ behavior: "smooth", block: "start" });
    }
});