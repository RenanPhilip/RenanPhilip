document.addEventListener("DOMContentLoaded", () => {
  const e = document.querySelector("#nome");
  if (alvo) {
    e.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});
