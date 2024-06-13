var object = document.getElementById('object');
var gameArea = document.getElementById('gameArea');
var platform = document.getElementById('platform');
var scoreSpan = document.getElementById('score');
var score = 0;
var fallingInterval;
var restartButton = document.getElementById('restartButton');
var moveLeftButton = document.getElementById('moveLeftButton');
var moveRightButton = document.getElementById('moveRightButton');

moveLeftButton.addEventListener('touchstart', function() {
    platform.style.left = Math.max(0, platform.offsetLeft - 50) + 'px';
});

moveRightButton.addEventListener('touchstart', function() {
    platform.style.left = Math.min(gameArea.offsetWidth - platform.offsetWidth, platform.offsetLeft + 50) + 'px';
});

function resetObject() {
    var gameAreaWidth = gameArea.offsetWidth;
    var newLeft = Math.floor(Math.random() * (gameAreaWidth - object.offsetWidth));
    object.style.top = '0px';
    object.style.left = newLeft + 'px';
    clearInterval(fallingInterval);
    fallingInterval = setInterval(function() {
        object.style.top = (object.offsetTop + 5) + 'px';
        if (object.offsetTop + object.offsetHeight > gameArea.offsetHeight) {
            clearInterval(fallingInterval);
            if (object.offsetLeft < platform.offsetLeft + platform.offsetWidth &&
                object.offsetLeft + object.offsetWidth > platform.offsetLeft) {
                score++;
                scoreSpan.textContent = score;
                resetObject();
            } else {
                alert('Game over! Your score is ' + score);
            }
        }
    }, 10);
}

restartButton.addEventListener('click', function() {
    score = 0;
    scoreSpan.textContent = score;
    resetObject();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        platform.style.left = Math.max(0, platform.offsetLeft - 50) + 'px';
    } else if (e.key === 'ArrowRight') {
        platform.style.left = Math.min(gameArea.offsetWidth - platform.offsetWidth, platform.offsetLeft + 50) + 'px';
    }
});

resetObject();