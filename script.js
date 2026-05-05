const intro = document.getElementById("intro");
const terminalSection = document.getElementById("terminal");
const terminal = document.getElementById("terminalOutput");
const revelationSection = document.getElementById("revelation");
const startBtn = document.getElementById("startExperience");

let realLocation = null;

document.body.classList.add("lock-scroll");

// ==========================
// Buscar localização via IP
// ==========================
async function fetchLocation() {
    try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        realLocation = {
            ip: data.ip,
            city: data.city,
            region: data.region,
            country: data.country_name,
            org: data.org
        };
    } catch (error) {
        realLocation = null;
    }
}

// ==========================
// Gerador IP Fake (backup)
// ==========================
function generateFakeIP() {
    return `${rand()}.${rand()}.${rand()}.${rand()}`;
}

function rand() {
    return Math.floor(Math.random() * 255);
}

// ==========================
// Efeito digitação
// ==========================
function typeLine(text, callback) {
    const line = document.createElement("p");
    terminal.appendChild(line);

    let i = 0;
    const interval = setInterval(() => {
        line.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            if (callback) setTimeout(callback, 600);
        }
    }, 35);
}

// ==========================
// Simulação principal
// ==========================
function startHackSimulation() {

    const detectedIP = realLocation?.ip || generateFakeIP();
    const detectedCity = realLocation
        ? `${realLocation.city}, ${realLocation.region} - ${realLocation.country}`
        : "Localização não identificada";
    const detectedISP = realLocation?.org || "Provedor desconhecido";

    const messages = [
        "Estabelecendo conexão...",
        "Iniciando varredura...",
        `IP detectado: ${detectedIP}`,
        "Rastreando localização aproximada...",
        `Localização: ${detectedCity}`,
        `Provedor identificado: ${detectedISP}`,
        `Navegador detectado: ${navigator.userAgent}`,
        "Buscando vulnerabilidades...",
        "Extraindo dados...",
        "Upload concluído."
    ];

    function next(index = 0) {
        if (index < messages.length) {
            typeLine(messages[index], () => next(index + 1));
        } else {
            setTimeout(showRevelation, 2000);
        }
    }

    next();
}

// ==========================
// Revelação
// ==========================
function showRevelation() {
    document.getElementById("revelation").style.display = "flex";
    document.getElementById("lesson").style.display = "block";

    document.body.classList.remove("lock-scroll");

    if (navigator.vibrate) {
        navigator.vibrate([300, 100, 300]);
    }

    document.body.style.backgroundColor = "#8b0000";

    setTimeout(() => {
        document.body.style.backgroundColor = "#000";
        revelationSection.scrollIntoView({ behavior: "smooth" });
    }, 400);
}

// ==========================
// Botão inicia tudo
// ==========================
startBtn.addEventListener("click", async () => {

    intro.style.transition = "opacity 0.6s ease";
    intro.style.opacity = "0";

    setTimeout(async () => {
        intro.style.display = "none";
        terminalSection.style.display = "flex";

        terminal.innerHTML = "";

        await fetchLocation();
        startHackSimulation();

    }, 600);
});