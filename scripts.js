const cardImages = [
    'barata.jfif',
    'borboleta.png',
    'cavalo.jfif',
    'cavalo4.png',
    'cobra.webp',
    'cobra3.png',
    'imagem1.jfif',
    'imagem2.png'
];

let gameCards = [...cardImages, ...cardImages];
let firstCard, secondCard;
let lockBoard = false;
let matchedCards = 0;

// Embaralhar as cartas
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Criar o tabuleiro
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    shuffle(gameCards).forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        const img = document.createElement('img');
        img.src = image;
        card.appendChild(img);

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Virar a carta
function flipCard() {
    if (lockBoard || this.classList.contains('flipped')) return;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }
    
    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

// Checar se as cartas combinam
function checkForMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        matchedCards += 2;
        resetBoard();
        if (matchedCards === gameCards.length) {
            alert('Você ganhou!');
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

// Resetar o tabuleiro
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Reiniciar o jogo
document.getElementById('reset-button').addEventListener('click', () => {
    matchedCards = 0;
    document.getElementById('game-board').innerHTML = '';
    createBoard();
});

// Iniciar o jogo
createBoard();
