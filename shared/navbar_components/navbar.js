async function loadNavbar() {
  try {
    const basePath = "https://renanphilip.github.io/RenanPhilip/shared/navbar_components/";

    // Busca HTML
    const navbar_html = await fetch(`${basePath}navbar.html`);
    if (!navbar_html.ok) throw new Error(`Erro HTTP: ${navbar_html.status}`);
    const html = await navbar_html.text();

    const navbar = document.createElement("div");
    navbar.innerHTML = html;

    // Ignora carregamento da navbar caso ja exista
    const existingNavbar = document.querySelector("#navbar")
    if (existingNavbar) {
      console.warn("Navbar já existente, ignorando duplicação");
      return;
    }

    // Injeta navbar carregada
    document.body.prepend(navbar);

    // Injeta CSS caso ainda nao exista
    if (!document.getElementById("navbar-css")) {
      const css_link = document.createElement("link");
      css_link.rel = "stylesheet";
      css_link.href = `${basePath}navbar.css`;
      css_link.id = "navbar-css";
      document.head.appendChild(css_link);
    }

    // Adiciona ao DOM
    // document.body.prepend(navbar);
    setupNavbarToggle();
    console.log("Navbar adicionada ao DOM");

  } catch (err) {
    console.error("Erro ao carregar navbar:", err);
  }
}

function setupNavbarToggle() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", (e) => {
    menu.classList.toggle("show");
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (menu.classList.contains("show") &&
      !menu.contains(e.target) &&
      !toggle.contains(e.target)) {
      menu.classList.remove("show");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") menu.classList.remove("show");
  });
}

window.addEventListener("load", () => {
  loadNavbar();
});