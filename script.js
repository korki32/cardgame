var animateButton = function(e) {
  e.preventDefault();
  // reset animation
  e.target.classList.remove('animate');
  
  e.target.classList.add('animate');
  setTimeout(function() {
    e.target.classList.remove('animate');
  }, 700);
};

var bubblyButtons = document.getElementsByClassName("new-game-button);

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}

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
