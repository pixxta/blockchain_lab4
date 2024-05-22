document.getElementById('rollDiceButton').addEventListener('click', function() {
    const dice = document.getElementById('dice');
    const faces = 6;
    const roll = Math.floor(Math.random() * faces) + 1;

    // Удаляем все классы граней
    dice.className = 'dice';

    // Добавляем соответствующий класс для выпавшего числа
    dice.classList.add(`show-${roll}`);

    // Показываем выпавшее число
    setTimeout(() => {
        alert(`Выпало число: ${roll}`);
    }, 1000);
});
