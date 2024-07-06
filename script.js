const phrases = [
    "Én még sosem ettem sushi-t.",
    "Én még sosem voltam külföldön.",
    "Én még sosem láttam a tengert.",
    "Én még sosem ugráltam ejtőernyővel.",
    "Én még sosem ettem egy egész tortát egyedül.",
    "Én még sosem voltam éjszakai túrán.",
    // Add more phrases here
];

function flipCard() {
    const card = document.getElementById('card');
    card.classList.toggle('flipped');
    
    if (card.classList.contains('flipped')) {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        document.getElementById('card-text').textContent = phrases[randomIndex];
    }
}

document.getElementById('card').addEventListener('touchstart', function() {
    flipCard();
});
