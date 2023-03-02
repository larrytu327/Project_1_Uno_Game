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

//Creating deck of cards along with function for shuffling deck, credit to: https://www.programiz.com/javascript/examples/shuffle-card
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

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random()*i);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function drawCard() {
    shuffleDeck();
    let cardBeingDrawn = [];
    cardBeingDrawn = deck[Math.floor(Math.random()*(deck.length))];
    //displayDrawCards.innerHTML = `${cardDisplayed}`;
    //console.log(cardDisplayed);
    deck.pop(cardBeingDrawn);
    //console.log(deck.length);
    return cardBeingDrawn;
    
}

function dealCardsAtStart() {
    let player1Cards = [];
    let player2Cards = [];
    for (let j = 0; j < 7; j++) {
        player1Cards[j] = drawCard();
        player2Cards[j] = drawCard();
        console.log(player1Cards[j]);
    }
    let cardOnDiscardPile = drawCard();
    console.log(deck.length);
    console.log(cardOnDiscardPile);
    displayDrawCards.innerHTML = `${cardOnDiscardPile}`;
    checkForMatch(player1Cards, cardOnDiscardPile);
}

function checkForMatch(player1Cards, cardOnDiscardPile) {
    for (let i = 0; i < player1Cards.length; i++) {
        if (player1Cards[i].Value === cardOnDiscardPile.Value || player1Cards[i].Color === cardOnDiscardPile.Color) {
            console.log("There is a match between player1Cards and cardOnDiscardPile");
            return true;
        }
        else if (player1Cards[i].Color === "Wild" || player1Cards[i].Color  === "Wild Draw 4" || cardOnDiscardPile.Color === "Wild" || cardOnDiscardPile.Color  === "Wild Draw 4") {
            console.log("There is a match between player1Cards and cardOnDiscardPile");
            return true;
        }
    }
    console.log("There is no match between player1Cards and cardOnDiscardPile");
}

drawCardInput.addEventListener("click", drawCard);
startGame.addEventListener("click", dealCardsAtStart);
