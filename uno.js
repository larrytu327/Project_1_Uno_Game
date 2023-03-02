//Grabbing elements from DOM
let drawCardInput = document.querySelector(".drawCardButton");
let startGame = document.querySelector(".startGameButton");
let unoCall = document.querySelector(".unoButton");
let endTurn = document.querySelector("endTurnButton");
let player1Cards = document.querySelector("#player1Hand");
let player2Cards = document.querySelector("#player2Hand");
let cardPileOutput = document.querySelector("#cardPile");
let displayDrawCards = document.querySelector(".drawCards");
let displayDiscardPileCard = document.querySelector(".discardPileCard");

//Establishing the deck of cards with arrays and objects
const colors = ["Blue", "Red", "Yellow", "Green"];
const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Skip", "Draw 2"];
const wildCards = ["Wild", "Wild Draw 4"];

//Creating deck of cards along with function for shuffling deck, credit to: https://www.programiz.com/javascript/examples/shuffle-card
let deck = [];

for (let i = 0; i < colors.length; i++) {
    for (let j = 0; j < values.length; j++) {
        let card = {Color: colors[i], Value: values[j]};
        deck.push(card);
        if (card.Value === "Skip" || card.Value === "Draw 2") {
            deck.push(card);
        }
    }
}

for (let i = 0; i < wildCards.length; i++) {
    for (let j = 0; j < 4; j++) {
        let card = {Color: wildCards[i], Value: ""};
        deck.push(card);
    }
}


//Functions
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
    deck.pop(cardBeingDrawn);
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
    displayDiscardPileCard.innerHTML = `${cardOnDiscardPile}`;
}

function checkForMatch(playerCardsToCheck, cardOnDiscardPile) {
    for (let i = 0; i < playerCardsToCheck.length; i++) {
        if (playerCardsToCheck[i].Value === cardOnDiscardPile.Value || playerCardsToCheck[i].Color === cardOnDiscardPile.Color) {
            console.log("There is a match between playerCardsToCheck and cardOnDiscardPile");
            return true;
        }
        else if (playerCardsToCheck[i].Color === "Wild" || playerCardsToCheck[i].Color  === "Wild Draw 4" || cardOnDiscardPile.Color === "Wild" || cardOnDiscardPile.Color  === "Wild Draw 4") {
            console.log("There is a match between playerCardsToCheck and cardOnDiscardPile");
            return true;
        }
    }
    console.log("There is no match between playerCardsToCheck and cardOnDiscardPile");
    return false;
}

//Event Listeners
drawCardInput.addEventListener("click", drawCard);
startGame.addEventListener("click", dealCardsAtStart);
