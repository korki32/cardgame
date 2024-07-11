document.addEventListener('DOMContentLoaded', function() {
    sessionStorage.clear();

    document.getElementById('player-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Űrlap alapértelmezett küldésének megakadályozása

        const players = document.getElementById('players').value.split(',').map(name => name.trim());
        const includeSpecialCards = document.getElementById('include-special-cards').checked;
        const includeNormalCards = document.getElementById('include-normal-cards').checked;
        const include18PlusCards = document.getElementById('include-18-cards').checked;

        sessionStorage.setItem('players', JSON.stringify(players));
        sessionStorage.setItem('includeSpecialCards', includeSpecialCards);
        sessionStorage.setItem('includeNormalCards', includeNormalCards);
        sessionStorage.setItem('include18PlusCards', include18PlusCards);

        window.location.href = 'game.html'; // Átirányítás a game.html oldalra
    });

    const animateButton = function (e) {
        e.preventDefault();
        e.target.classList.remove('animate');
        e.target.classList.add('animate');
        setTimeout(function () {
            e.target.classList.remove('animate');
        }, 700);
    };

    const bubblyButtons = document.getElementsByClassName("bubbly-buttonsss");

    for (let i = 0; i < bubblyButtons.length; i++) {
        bubblyButtons[i].addEventListener('click', animateButton, false);
    }

    document.getElementById('card').addEventListener('touchstart', function() {
        flipCard();
    });
});
