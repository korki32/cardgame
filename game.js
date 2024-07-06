const phrases = [
    "Én még sosem ettem sushi-t.",
    "Én még sosem voltam külföldön.",
    "Én még sosem láttam a tengert.",
    "Én még sosem ugráltam ejtőernyővel.",
    "Én még sosem ettem egy egész tortát egyedül.",
    "Én még sosem voltam éjszakai túrán.",
    // Add more phrases here
];

let usedPhrases = JSON.parse(localStorage.getItem('usedPhrases')) || [];
let cardCount = parseInt(localStorage.getItem('cardCount')) || 0;
let players = JSON.parse(localStorage.getItem('players')) || [];
let currentPlayerIndex = parseInt(localStorage.getItem('currentPlayerIndex')) || 0;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('total-cards').textContent = phrases.length;
    document.getElementById('card-count').textContent = cardCount;
    document.getElementById('current-player').textContent = `Játékos: ${players[currentPlayerIndex]}`;
    document.getElementById('card').addEventListener('touchstart', function() {
        flipCard();
    });
});

function flipCard() {
    const card = document.getElementById('card');
    card.classList.toggle('flipped');
    
    if (card.classList.contains('flipped')) {
        const remainingPhrases = phrases.filter(phrase => !usedPhrases.includes(phrase));
        if (remainingPhrases.length === 0) {
            alert("Minden kártyát felfordítottál!");
            return;
        }
        const randomIndex = Math.floor(Math.random() * remainingPhrases.length);
        const selectedPhrase = remainingPhrases[randomIndex];
        usedPhrases.push(selectedPhrase);
        document.getElementById('card-text').textContent = selectedPhrase;
        cardCount++;
        document.getElementById('card-count').textContent = cardCount;
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        document.getElementById('current-player').textContent = `Játékos: ${players[currentPlayerIndex]}`;
        saveGameState();
    }
}

function saveGameState() {
    localStorage.setItem('usedPhrases', JSON.stringify(usedPhrases));
    localStorage.setItem('cardCount', cardCount.toString());
    localStorage.setItem('currentPlayerIndex', currentPlayerIndex.toString());
}

function saveGame() {
    alert('A játék állapota elmentve.');
}
