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

document.addEventListener('DOMContentLoaded', function() {
    sessionStorage.clear();

    document.getElementById('player-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const players = document.getElementById('players').value.split(',').map(name => name.trim());
        const includeSpecialCards = document.getElementById('include-special-cards').checked;
        sessionStorage.setItem('players', JSON.stringify(players));
        sessionStorage.setItem('includeSpecialCards', includeSpecialCards);
        window.location.href = 'game.html';
    });

    const animateButton = function (e) {
        e.preventDefault();
        e.target.classList.remove('animate');
        e.target.classList.add('animate');
        setTimeout(function () {
            e.target.classList.remove('animate');
        }, 700);
    };

    const bubblyButtons = document.getElementsByClassName("bubbly-button");

    for (let i = 0; i < bubblyButtons.length; i++) {
        bubblyButtons[i].addEventListener('click', animateButton, false);
    }
});
