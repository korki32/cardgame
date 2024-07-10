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
