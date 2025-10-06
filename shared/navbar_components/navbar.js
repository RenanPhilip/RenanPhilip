async function loadNavbar() {
  try {
    const isLocal =
      location.hostname.includes('localhost') ||
      location.hostname === '127.0.0.1' ||
      location.protocol === 'file:' ||
      location.port === '5500';

    const basePath = isLocal
      ? './shared/navbar_components/'
      : 'https://renanphilip.github.io/RenanPhilip/shared/navbar_components/';

    console.log('Ambiente:', isLocal ? 'Local' : 'Online');

    // Evita carregar duas vezes
    if (document.querySelector('header.navbar')) {
      console.warn('Navbar já carregada — ignorando duplicação');
      return;
    }

    // Busca o HTML
    const navbar_html = await fetch(`${basePath}navbar.html`);
    if (!navbar_html.ok) throw new Error(`Erro HTTP: ${navbar_html.status}`);
    const html = await navbar_html.text();

    // Cria elemento temporário e injeta no topo
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const navbar = temp.querySelector('header');
    if (!navbar) throw new Error("Navbar não encontrada");
    document.body.prepend(navbar);

    // Injeta o CSS
    const css_link = document.createElement('link');
    css_link.rel = 'stylesheet';
    css_link.href = `${basePath}navbar.css`;
    document.head.appendChild(css_link);

    console.log("Navbar adicionada ao DOM");

    // Inicializa interações
    setupNavbarToggle();

  } catch (err) {
    console.error("Erro ao carregar navbar:", err);
  }
}

// Controle do menu responsivo
function setupNavbarToggle() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", (e) => {
    menu.classList.toggle("show");
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (
      menu.classList.contains("show") &&
      !menu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      menu.classList.remove("show");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") menu.classList.remove("show");
  });
}

// Chamada final
loadNavbar().then(() => console.log("Navbar carregada"));
