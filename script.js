const terminal = document.getElementById("terminalOutput");
const revelationSection = document.getElementById("revelation");

// Lista de mensagens simuladas
const messages = [
    "Estabelecendo conexão...",
    "IP identificado...",
    "Dispositivo móvel detectado...",
    "Sistema operacional detectado...",
    "Buscando vulnerabilidades...",
    "Extraindo dados do navegador...",
    "Acessando galeria de fotos...",
    "Sincronizando contatos...",
    "Upload concluído."
];

// Gerador de IP fake
function generateFakeIP() {
    return `${rand()}.${rand()}.${rand()}.${rand()}`;
}

function rand() {
    return Math.floor(Math.random() * 255);
}

// Efeito de digitação
function typeLine(text, callback) {
    let line = document.createElement("p");
    terminal.appendChild(line);

    let i = 0;
    let interval = setInterval(() => {
        line.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            if (callback) setTimeout(callback, 500);
        }
    }, 40);
}

// Sequência principal
function startHackSimulation(index = 0) {
    if (index < messages.length) {
        let text = messages[index];

        // Inserir IP fake na mensagem certa
        if (text.includes("IP identificado")) {
            text += " " + generateFakeIP();
        }

        typeLine(text, () => startHackSimulation(index + 1));
    } else {
        setTimeout(showRevelation, 1500);
    }
}

// Mostrar revelação
function showRevelation() {

    // Vibrar celular se possível
    if (navigator.vibrate) {
        navigator.vibrate([300, 100, 300]);
    }

    // Flash de tela
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
        document.body.style.backgroundColor = "black";
    }, 200);

    // Scroll suave
    revelationSection.scrollIntoView({ behavior: "smooth" });
}

// Iniciar ao carregar
window.onload = () => {
    terminal.innerHTML = "";
    startHackSimulation();
};