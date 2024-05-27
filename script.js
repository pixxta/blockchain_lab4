window.addEventListener('load', function() {
    if (window.ethereum == undefined) {
        console.log('Please install MetaMask!');
        alert('Please install MetaMask!');
    } else {
        ethereum
            .request({
                method: 'net_version'
            })
            .then((result) => {
                console.log("Сеть: " + result);
            })
            .catch((error) => {
                console.log(error);
            });

        ethereum
            .request({
                method: 'eth_accounts'
            })
            .then((accounts) => {
                if (accounts.length > 0) {
                    getBalance(accounts[0]);
                } else {
                    document.getElementById('balanceText').textContent = 'Не удалось получить баланс. Пожалуйста, разрешите доступ к вашему кошельку MetaMask.';
                }
            })
            .catch((error) => {
                console.log(error);
                document.getElementById('balanceText').textContent = 'Не удалось получить баланс. Пожалуйста, разрешите доступ к вашему кошельку MetaMask.';
            });
    }
});

function getBalance(address) {
    ethereum
        .request({
            method: 'eth_getBalance',
            params: [address]
        })
        .then((result) => {
            console.log("Баланс: " + parseInt(result, 16) / 1e18);
            document.getElementById('balanceText').textContent = "Ваш баланс: " + parseInt(result, 16) / 1e18 + " ETH";
        })
        .catch((error) => {
            console.log(error);
            document.getElementById("output").innerHTML = error.message;
            document.getElementById('balanceText').textContent = 'Не удалось получить баланс. Пожалуйста, разрешите доступ к вашему кошельку MetaMask.';
        });
}

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
        document.getElementById('resultText').textContent = `У вас выпало: ${roll}`;
    }, 1000);
});
