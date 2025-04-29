// DOM Elements
const demoArea = document.getElementById('demo-area');
const demoElement = document.getElementById('demo-element');
const anthem = document.getElementById('anthem');
const visitorNameInput = document.getElementById('visitor-name');
const welcomeMessage = document.getElementById('welcome-message');
const players = [
    "Ter Stegen", "João Cancelo", "Ronald Araújo", "Jules Koundé", 
    "Alejandro Balde", "Frenkie de Jong", "Pedri", "Gavi", 
    "Ilkay Gündogan", "Robert Lewandowski", "Raphinha", "Lamine Yamal"
];
const btnShowSquad = document.getElementById('btn-show-squad');
const squadSection = document.getElementById('squad-section');
const playerSearch = document.getElementById('player-search');
const squadList = document.getElementById('squad-list');
// Buttons
const buttons = {
    firstKit: document.getElementById('btn-first-kit'),
    secondKit: document.getElementById('btn-second-kit'),
    thirdKit: document.getElementById('btn-third-kit'),
    shield: document.getElementById('btn-shield'),
    slogan: document.getElementById('btn-slogan'),
    toggleBackground: document.getElementById('btn-toggle-background'),
    increaseSize: document.getElementById('btn-increase-size'),
    decreaseSize: document.getElementById('btn-decrease-size'),
    playAnthem: document.getElementById('btn-play-anthem'),
    stopAnthem: document.getElementById('btn-stop-anthem'),
    

    
    
};
btnShowSquad.addEventListener('click', () => {
    squadSection.classList.toggle('hidden');
    if (!squadSection.classList.contains('hidden')) {
        renderSquad(players);
    }
});

// Utility Functions
function showImage(src, alt) {
    demoArea.innerHTML = `<img src="${src}" alt="${alt}">`;
}

function showText(text) {
    demoArea.innerHTML = `<p>${text}</p>`;
}

function renderSquad(filteredPlayers) {
    squadList.innerHTML = '';
    filteredPlayers.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player;
        squadList.appendChild(li);
    });
}

playerSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = players.filter(player => player.toLowerCase().includes(searchTerm));
    renderSquad(filtered);
});

// Event Listeners
buttons.firstKit.addEventListener('click', () => {
    showImage('img/1ra equipacion.png', 'Primera equipación Barça');
});

buttons.secondKit.addEventListener('click', () => {
    showImage('img/2da equipacion.png', 'Segunda equipación Barça');
});

buttons.thirdKit.addEventListener('click', () => {
    showImage('img/3ra equipacion.png', 'Tercera equipación Barça');
});

buttons.shield.addEventListener('click', () => {
    showImage('https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg', 'Escudo FC Barcelona');
});

buttons.slogan.addEventListener('click', () => {
    showText('Més que un club');
});

buttons.toggleBackground.addEventListener('click', () => {
    demoArea.classList.toggle('background-alt');
});

buttons.increaseSize.addEventListener('click', () => {
    demoArea.classList.add('demo-large');
    demoArea.classList.remove('demo-small');
});

buttons.decreaseSize.addEventListener('click', () => {
    demoArea.classList.add('demo-small');
    demoArea.classList.remove('demo-large');
});

// Play and Stop Anthem
buttons.playAnthem.addEventListener('click', () => {
    anthem.play();
});

buttons.stopAnthem.addEventListener('click', () => {
    anthem.pause();
    anthem.currentTime = 0;
});

visitorNameInput.addEventListener('input', (e) => {
    welcomeMessage.textContent = `¡Hola, ${e.target.value}! Bienvenido al Barça.`;
});
