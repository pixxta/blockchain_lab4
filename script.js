var web3 = new Web3(Web3.givenProvider);

var contractAddress = '0xddaAd340b0f1Ef65169Ae5E41A8b10776a75482d';

var contractABI = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "win",
				"type": "bool"
			}
		],
		"name": "BetPlaced",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "PaymentEvent",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bool",
				"name": "win",
				"type": "bool"
			}
		],
		"name": "placeBet",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdrawBalance",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "balance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

// Создаем экземпляр контракта
var contractInstance = new web3.eth.Contract(contractABI, contractAddress);

// Функция для отправки ставки на контракт
function placeBet(win, roll, stavka) {
    var betAmount = web3.utils.toWei(stavka, 'ether');
    contractInstance.methods.placeBet(win).send({from: ethereum.selectedAddress, value: betAmount})
        .on('transactionHash', function(hash){
        })
        .on('receipt', function(receipt){
            if (receipt.events.BetPlaced.returnValues.win) {
                // Если выигрыш, обновляем текст результата
                const dice = document.getElementById('dice');
                dice.className = 'dice';
                dice.classList.add(`show-${roll}`);
                setTimeout(() => {
                    const dice = document.getElementById('dice');
                    dice.className = 'dice';
                    dice.classList.add(`show-${roll}`);
                    document.getElementById('resultText').textContent = `У вас выпало: ${roll}, вы выиграли!`;
                }, 1000);
            } else {
                setTimeout(() => {
                    const dice = document.getElementById('dice');
                    dice.className = 'dice';
                    dice.classList.add(`show-${roll}`);
                    document.getElementById('resultText').textContent = `У вас выпало: ${roll}, вы проиграли!`;
                }, 1000);
            }

            // Обновляем баланс после выполнения ставки
            ethereum.request({ method: 'eth_accounts' })
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
        })
        .on('confirmation', function(confirmationNumber, receipt){

        })
        .on('error', console.error);
}

// Обработчик события клика по кнопке "Больше трех"
document.getElementById('betOverThreeButton').addEventListener('click', function() {
    const faces = 6;
    const roll = Math.floor(Math.random() * faces) + 1;
	var betInput = document.getElementById('betInput');
    // Отправляем ставку на контракт в зависимости от выпавшего числа
    if (roll > 3) {
        placeBet(true, roll, betInput.value);
    } else {
        placeBet(false, roll, betInput.value);
    }

    
    setTimeout(() => {
        document.getElementById('resultText').textContent = `Подтвердите операцию в MetaMask`;
    }, 1000);
    
});

// Обработчик события клика по кнопке "Меньше трех"
document.getElementById('betUnderThreeButton').addEventListener('click', function() {
    const faces = 6;
    const roll = Math.floor(Math.random() * faces) + 1;
	var betInput = document.getElementById('betInput');
    if (roll < 3) {
        placeBet(true, roll, betInput.value);
    } else {
        placeBet(false, roll, betInput.value);
    }
    setTimeout(() => {
        document.getElementById('resultText').textContent = `Подтвердите операцию в MetaMask`;
    }, 1000);

});

// Функция для получения баланса аккаунта
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
            document.getElementById('balanceText').textContent = 'Не удалось получить баланс. Пожалуйста, разрешите доступ к вашему кошельку MetaMask.';
        });
}

// Функция для сброса анимации кубика
function resetDiceAnimation() {
    const dice = document.getElementById('dice');
    dice.classList.remove('show-1', 'show-2', 'show-3', 'show-4', 'show-5', 'show-6');
    dice.classList.add('animate-roll');
    setTimeout(() => {
        dice.classList.remove('animate-roll');
    }, 500);
}

// Запрос баланса текущего аккаунта
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

    document.getElementById('balanceText').addEventListener('click', function() {
        const balanceText = document.getElementById('balanceText');
        balanceText.classList.toggle('hidden-balance');
        balanceText.classList.toggle('visible-balance');
    });