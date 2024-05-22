document.getElementById('rollDiceButton').addEventListener('click', function() {
    const dice = document.getElementById('dice');
    const faces = 6;
    const roll = Math.floor(Math.random() * faces) + 1;

    let xRotation = Math.floor(Math.random() * 4) * 90;
    let yRotation = Math.floor(Math.random() * 4) * 90;

    dice.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;

    setTimeout(() => {
        alert(`Выпало число: ${roll}`);
    }, 1000);
});