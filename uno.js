let cardPile = [0,1,2,3,4,5,6,7,8,9];
let drawCardInput = document.querySelector(".drawCardButton");
let startGame = document.querySelector(".startGameButton");
let unoCall = document.querySelector(".unoButton");
let endTurn = document.querySelector("endTurnButton");
let player1Cards = document.querySelector("#player1Hand");
let player2Cards = document.querySelector("#player2Hand");
let cardPileOutput = document.querySelector("#cardPile");
let displayDrawCards = document.querySelector(".drawCards");

const colors = ["Blue", "Red", "Yellow", "Green"];
const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Skip", "Draw 2"];
const wildCards = ["Wild", "Wild Draw 4"];

let deck = [];

for (let i = 0; i < colors.length; i++) {
    for (let j = 0; j < values.length; j++) {
        let card = {Color: colors[i], Value: values[j]};
        deck.push(card);
    }
}

for (let i = 0; i < wildCards.length; i++) {
    for (let j = 0; j < 4; j++) {
        let card = {Color: wildCards[i], Value: ""};
        deck.push(card);
    }
}

// for (let i = 0; i < deck.length; i++) {
//     console.log(deck[i]);
// }

for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random()*i);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
}

// console.log("The first five cards are: ");

// for (let i = 0; i < 5; i++) {
//     console.log(`${deck[i].Color} ${deck[i].Value}`);
// }


function drawCard() {
    displayDrawCards.innerHTML = `${cardPile[Math.floor(Math.random()*(cardPile.length))]}`;
}

drawCardInput.addEventListener("click", drawCard);

