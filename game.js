let usedPhrases = JSON.parse(sessionStorage.getItem('usedPhrases')) || [];
let cardCount = parseInt(sessionStorage.getItem('cardCount')) || 0;
let players = JSON.parse(sessionStorage.getItem('players')) || [];
let currentPlayerIndex = parseInt(sessionStorage.getItem('currentPlayerIndex')) || 0;
let includeNormalCards = sessionStorage.getItem('includeNormalCards') === 'true';
let include18PlusCards = sessionStorage.getItem('include18PlusCards') === 'true';
let includeSpecialCards = sessionStorage.getItem('includeSpecialCards') === 'true';
let phrases = [];

document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded, loading phrases...');
    loadPhrases();
});

function loadPhrases() {
    let promises = [];
    
    if (includeNormalCards) {
        console.log('Including normal cards');
        promises.push(fetch('normal.json').then(response => response.json()));
    }
    if (include18PlusCards) {
        console.log('Including 18+ cards');
        promises.push(fetch('18plus.json').then(response => response.json()));
    }
    if (includeSpecialCards) {
        console.log('Including special cards');
        promises.push(fetch('special.json').then(response => response.json()));
    }
    
    Promise.all(promises)
        .then(results => {
            phrases = [];
            results.forEach(data => {
                phrases = phrases.concat(data);
            });
            console.log('Phrases loaded:', phrases);
            document.getElementById('total-cards').textContent = phrases.length;
            document.getElementById('card-count').textContent = cardCount;
            updateCurrentPlayer();
        })
        .catch(error => console.error('Error loading phrases:', error));
}

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
        updateCurrentPlayer();
        sessionStorage.setItem('usedPhrases', JSON.stringify(usedPhrases));
        sessionStorage.setItem('cardCount', cardCount.toString());
        sessionStorage.setItem('currentPlayerIndex', currentPlayerIndex.toString());
        
        // Frissítjük a még elérhető kártyák sáv szélességét és animáljuk a korsó mozgását
        const remainingPercentage = (remainingPhrases.length / phrases.length) * 100;
        document.getElementById('remaining-bar').style.width = `${remainingPercentage}%`;

        // Animáljuk a sörös korsó mozgását
        const beerMug = document.getElementById('beer-mug');
        beerMug.style.transform = `translateY(${100 - remainingPercentage}%)`;

        const cardBack = document.querySelector('.card.flipped .back');
        cardBack.classList.remove('normal', 'plus18', 'special');

        if (includeNormalCards && selectedPhrase.type === 'normal') {
            cardBack.classList.add('normal');
            cardBack.classList.add('normalFlip');
        } else if (include18PlusCards && selectedPhrase.type === 'plus18') {
            cardBack.classList.add('plus18');
            cardBack.classList.add('plus18Flip');
        } else if (includeSpecialCards && selectedPhrase.type === 'special') {
            cardBack.classList.add('special');
            cardBack.classList.add('specialFlip');
        }
    }
}

function updateCurrentPlayer() {
    if (players.length > 0) {
        document.getElementById('current-player').textContent = `Játékos: ${players[currentPlayerIndex]}`;
    }
}

document.getElementById('player-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const playerNames = document.getElementById('players').value.split(',').map(name => name.trim());
    const includeNormalCards = document.getElementById('include-normal-cards').checked;
    const include18PlusCards = document.getElementById('include-18-cards').checked;
    const includeSpecialCards = document.getElementById('include-special-cards').checked;

    if (playerNames.length === 0) {
        alert('Kérlek, adj meg legalább egy játékos nevet!');
        return;
    }

    sessionStorage.setItem('players', JSON.stringify(playerNames));
    sessionStorage.setItem('includeNormalCards', includeNormalCards.toString());
    sessionStorage.setItem('include18PlusCards', include18PlusCards.toString());
    sessionStorage.setItem('includeSpecialCards', includeSpecialCards.toString());

    startGame(playerNames, includeNormalCards, include18PlusCards, includeSpecialCards);
});

function startGame(playerNames, includeNormalCards, include18PlusCards, includeSpecialCards) {
    players = playerNames;
    currentPlayerIndex = 0;
    usedPhrases = [];
    cardCount = 0;
    sessionStorage.setItem('usedPhrases', JSON.stringify(usedPhrases));
    sessionStorage.setItem('cardCount', cardCount.toString());
    sessionStorage.setItem('currentPlayerIndex', currentPlayerIndex.toString());
    
    // Frissítjük a változókat a sessionStorage alapján
    includeNormalCards = sessionStorage.getItem('includeNormalCards') === 'true';
    include18PlusCards = sessionStorage.getItem('include18PlusCards') === 'true';
    includeSpecialCards = sessionStorage.getItem('includeSpecialCards') === 'true';

    console.log('Starting game with settings:', {
        players, includeNormalCards, include18PlusCards, includeSpecialCards
    });
    
    loadPhrases();
}
