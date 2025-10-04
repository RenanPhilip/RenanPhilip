document.addEventListener("DOMContentLoaded", () => {
  const alvo = document.querySelector("#nome");
  if (alvo) {
    alvo.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});