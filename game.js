let usedPhrases = JSON.parse(sessionStorage.getItem('usedPhrases')) || [];
let cardCount = parseInt(sessionStorage.getItem('cardCount')) || 0;
let players = JSON.parse(sessionStorage.getItem('players')) || [];
let currentPlayerIndex = parseInt(sessionStorage.getItem('currentPlayerIndex')) || 0;
let includeSpecialCards = sessionStorage.getItem('includeSpecialCards') === 'true';
let phrases = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('phrases.json')
        .then(response => response.json())
        .then(data => {
            phrases = data;
            if (!includeSpecialCards) {
                phrases = phrases.filter(phrase => !phrase.startsWith("Különleges kártya:"));
            }
            document.getElementById('total-cards').textContent = phrases.length;
            document.getElementById('card-count').textContent = cardCount;
            updateCurrentPlayer();
        })
        .catch(error => console.error('Error loading phrases:', error));
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

        if (selectedPhrase.startsWith("Különleges kártya:")) {
            handleSpecialCard(selectedPhrase);
            card.classList.add('special-card');
        } else {
            document.getElementById('card-text').textContent = selectedPhrase;
            card.classList.remove('special-card');
        }

        cardCount++;
        document.getElementById('card-count').textContent = cardCount;
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        updateCurrentPlayer();
        sessionStorage.setItem('usedPhrases', JSON.stringify(usedPhrases));
        sessionStorage.setItem('cardCount', cardCount.toString());
        sessionStorage.setItem('currentPlayerIndex', currentPlayerIndex.toString());
        
        updateBeerMug();
    } else {
        card.classList.remove('special-card');
    }
}

function updateBeerMug() {
    const totalCards = phrases.length;
    const usedCards = usedPhrases.length;

    // Számítsuk ki a sörös korsó magasságát a felhasznált kártyák alapján
    const remainingHeight = (usedCards / totalCards) * 100; // Százalékos magasság kiszámítása
    document.getElementById('beer-mug').style.transform = `translateY(${100 - remainingHeight}%)`;
}

function handleSpecialCard(phrase) {
    const randomPlayerIndex = Math.floor(Math.random() * players.length);
    const randomPlayer = players[randomPlayerIndex];
    let message = phrase.replace("válassz egy játékost", randomPlayer);
    document.getElementById('card-text').textContent = message;
    animateSpecialEffect();
}

function animateSpecialEffect() {
    const card = document.getElementById('card');
    card.classList.add('special-card-animation');
    setTimeout(() => {
        card.classList.remove('special-card-animation');
    }, 1000); // Adjust timing as needed
}

function updateCurrentPlayer() {
    if (players.length > 0) {
        document.getElementById('current-player').textContent = `Játékos: ${players[currentPlayerIndex]}`;
    }
}
