async function loadNavbar() {
  try {
    // Detecta ambiente (local vs produção)
    const isLocal = location.hostname.includes('localhost') || location.port === '5500';
    const basePath = isLocal 
      ? './shared/navbar_components/'
      : 'https://renanphilip.github.io/shared/navbar_components/';

    import(`${basePath}navbar.js`)
      .then(() => console.log('Navbar carregada com base dinâmica'));
    
    // Carrega HTML da navbar
    const navbar_html = await fetch(`${basePath}navbar.html`);
    if (!navbar_html.ok) throw new Error(`Erro HTTP: ${navbar_html.status}`);
    const html = await navbar_html.text();

    // Cria elemento temporário e extrai o header
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const navbar = temp.querySelector('header');
    if (!navbar) throw new Error("Navbar não encontrada no HTML");

    // Injeta CSS da navbar
    const css_link = document.createElement('link');
    css_link.rel = 'stylesheet';
    css_link.href = `${basePath}navbar.css`;
    
    document.head.appendChild(css_link);

    // Insere a navbar no topo do body
    document.body.prepend(navbar);
    console.log("Navbar carregada.");

    // Inicializa o menu hamburguer
    setupNavbarToggle();

    // Após renderizar a navbar, faz o scroll para o conteúdo da página
    requestAnimationFrame(() => {
      const nextElement = navbar.nextElementSibling;
      if (nextElement) {
        nextElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });

  } catch (err) {
    console.error("Erro ao carregar navbar:", err);
  }
}

// Comportamento do menu responsivo
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

// Executa automaticamente
loadNavbar();
