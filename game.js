const phrases = [
    "Én még sosem ettem sushi-t.",
    "Én még sosem voltam külföldön.",
    "Én még sosem láttam a tengert.",
    "Én még sosem ugráltam ejtőernyővel.",
    "Én még sosem ettem egy egész tortát egyedül.",
    "Én még sosem voltam éjszakai túrán.",
    // Add more phrases here
];

let usedPhrases = [];
let cardCount = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('total-cards').textContent = phrases.length;
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
    }
}
