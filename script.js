/* ── Hero word animation ── */
const heroEl = document.getElementById("palabras_aparicion");
const palabras = ["Hola", "soy", "Hermen Steven", " "];
let indice = 0;

function esperar(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function escribirMaquina(texto) {
    const tw = document.getElementById("typewriter");
    const tm = document.getElementById("texto-maquina");
    tw.style.display = "block";
    tm.textContent = "";
    for (let letra of texto) {
        tm.textContent += letra;
        const delay = letra === ' ' ? 30 : letra === '.' ? 180 : 38 + Math.random() * 28;
        await esperar(delay);
    }
}

async function animar() {
    while (indice < palabras.length) {
        heroEl.textContent = palabras[indice];
        heroEl.classList.remove("animar", "animar-nombre");
        void heroEl.offsetWidth;
        const esNombre = indice === palabras.length - 2;
        heroEl.classList.add(esNombre ? "animar-nombre" : "animar");
        await esperar(750);
        indice++;
        await esperar(100);
    }
    heroEl.style.display = "none";
    await esperar(200);
    await escribirMaquina("¡Hola! Me llamo Hermen Steven, me dedico a ayudar a microempresas a crecer por medio de la creación de publicidad y sitios web.");
}

animar();

/* ── Scroll reveal ── */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add("visible"), i * 110);
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
);

document.querySelectorAll(".reveal").forEach(item => revealObserver.observe(item));

/* ── Navbar compacto al hacer scroll ── */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    navbar.style.height = window.scrollY > 50 ? "56px" : "70px";
}, { passive: true });