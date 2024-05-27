document.getElementById('higher').addEventListener('click', function() {
    rollDice(true);
});
document.getElementById('lower').addEventListener('click', function() {
    rollDice(false);
});

function rollDice(isHigher) {
    let result = Math.floor(Math.random() * 6) + 1;
    showDice(result);
    checkBet(result, isHigher);
}

function showDice(number) {
    const dice = document.querySelector('.dice');
    dice.className = 'dice show-' + number;
}

function checkBet(result, isHigher) {
    const betAmount = parseInt(document.getElementById('betAmount').value, 10);
    if (isNaN(betAmount) || betAmount < 1) {
        document.getElementById('message').textContent = "Пожалуйста, введите корректную ставку!";
        return;
    }

    if ((result > 3 && isHigher) || (result < 3 && !isHigher)) {
        document.getElementById('message').textContent = "Вы выиграли " + (betAmount * 2) + " денег!";
    } else {
        document.getElementById('message').textContent = "Вы проиграли!";
    }
}
