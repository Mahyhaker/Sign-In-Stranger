const emojis = ["😊", "😂", "😍", "😎", "😢", "😡", "😱", "🥳"];
let cards = [];
let flippedCards = [];
let matchedCards = 0;

function setupGame() {
    // Duplicar emojis e embaralhar
    const cardEmojis = [...emojis, ...emojis];
    cards = cardEmojis.sort(() => 0.5 - Math.random());
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = '';

    cards.forEach((emoji, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    const card = this;
    if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
        card.textContent = card.dataset.emoji;
        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedCards += 2;
        if (matchedCards === cards.length) {
            alert("Você ganhou!");
        }
    } else {
        firstCard.textContent = '';
        secondCard.textContent = '';
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
    }
    flippedCards = [];
}

document.getElementById("restart-button").addEventListener("click", setupGame);
setupGame();
