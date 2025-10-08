// Obtém o host atual (ex.: 127.0.0.1:5500)
const host = document.location.host;
console.log("CallNavbar host: ", host);

// Define o caminho relativo a partir da raiz do domínio
const navbarPath = '/RenanPhilip/shared/navbar_components/navbar.js';
// Constrói a URL completa com o protocolo hhtp
const scriptUrl = `${document.location.protocol}//${host}${navbarPath}`;
console.log("CallNavbar scriptUrl: ", scriptUrl);

// Cria dinamicamente a tag <script>
const navbarURL = document.createElement('script');
navbarURL.src = scriptUrl;
navbarURL.type = 'module';
console.log('navbarURL: ', navbarURL);

// Adiciona o script ao documento
document.head.appendChild(navbarURL);