//Grabbing elements from DOM
let drawCardInput = document.querySelector(".drawCardButton");
let startGame = document.querySelector(".startGameButton");
let unoCall = document.querySelector(".unoButton");
let endTurn = document.querySelector(".endTurnButton");
let player1CardsInHand = document.querySelector("#player1Hand");
let player2CardsInHand = document.querySelector("#player2Hand");
let cardPileOutput = document.querySelector("#cardPile");
let displayDrawCards = document.querySelector(".drawCards");
let displayDiscardPileCard = document.querySelector(".discardPileCard");
let allPlayer1CardSlots = document.getElementsByClassName("cardsPlayer1");
let allPlayer2CardSlots = document.getElementsByClassName
("cardsPlayer2");

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
        let card = {Color: wildCards[i], Value: "N/A"};
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
    console.log(deck.length);
    let player1Cards = [];
    let player2Cards = [];
    let cardOnDiscardPile = drawCard();
    displayDiscardPileCard.innerHTML = `Color: ${cardOnDiscardPile.Color} Value: ${cardOnDiscardPile.Value}`;
    console.log(`Discard Pile Card, Color: ${cardOnDiscardPile.Color} Value: ${cardOnDiscardPile.Value}`);
    for (let i = 0; i < 7; i++) {
        player1Cards[i] = drawCard();
        player2Cards[i] = drawCard();
        addCardsToPlayer1(player1Cards[i]);
        addCardsToPlayer2(player2Cards[i]);
        console.log(`Player 1 Card# ${i+1}, Color: ${player1Cards[i].Color} Value: ${player1Cards[i].Value}`);
        // checkForMatch(player1Cards[i], cardOnDiscardPile);
        console.log(`Player 2 Card# ${i+1}, Color: ${player2Cards[i].Color} Value: ${player2Cards[i].Value}`);
        // checkForMatch(player2Cards[i], cardOnDiscardPile);
    }
    console.log(deck.length);
    console.log(`allPlayer1CardSlots .length is: ${allPlayer1CardSlots.length}`);
    for (let j = 0; j<allPlayer1CardSlots.length; j++) {
        // console.log(allPlayer1CardSlots[j]);
        // console.log(typeof allPlayer1CardSlots[j]);
        // console.log(typeof cardOnDiscardPile);
        // console.log(cardOnDiscardPile);
        // console.log(allPlayer1CardSlots[j].value);   
        allPlayer1CardSlots[j].addEventListener("click", () => checkForMatch(allPlayer1CardSlots[j].value,cardOnDiscardPile));
        allPlayer2CardSlots[j].addEventListener("click", () => checkForMatch(allPlayer2CardSlots[j].value,cardOnDiscardPile));
    }
}

function addCardsToPlayer1(player1Cards) {
    let newCardOnPlayer1Board = document.createElement("div");
    newCardOnPlayer1Board.innerHTML = `Color: ${player1Cards.Color} Value: ${player1Cards.Value}`;
    newCardOnPlayer1Board.value = player1Cards;
    newCardOnPlayer1Board.classList.add("cardsPlayer1");
    player1CardsInHand.appendChild(newCardOnPlayer1Board);
}

function addCardsToPlayer2(player2Cards) {
    let newCardOnPlayer2Board = document.createElement("div");
    newCardOnPlayer2Board.innerHTML = `Color: ${player2Cards.Color} Value: ${player2Cards.Value}`;
    newCardOnPlayer2Board.value = player2Cards;
    newCardOnPlayer2Board.classList.add("cardsPlayer2");
    player2CardsInHand.appendChild(newCardOnPlayer2Board);
}

function checkForMatch(playerCardsToCheck, cardOnDiscardPile) {
    if (playerCardsToCheck.Value === cardOnDiscardPile.Value || playerCardsToCheck.Color === cardOnDiscardPile.Color) {
        console.log("There is a Match with Discard Pile");
        return true;
    }
    else if (playerCardsToCheck.Color === "Wild" || playerCardsToCheck.Color  === "Wild Draw 4" || cardOnDiscardPile.Color === "Wild" || cardOnDiscardPile.Color  === "Wild Draw 4") {
        console.log("There is a Match with Discard Pile");
        return true;
    }
    console.log("Not a Match with Discard Pile");
    return false;
}


// function checkForMatch(playerCardsToCheck, cardOnDiscardPile) {
//     for (let i = 0; i < playerCardsToCheck.length; i++) {
//         if (playerCardsToCheck[i].Value === cardOnDiscardPile.Value || playerCardsToCheck[i].Color === cardOnDiscardPile.Color) {
//             console.log("There is a match between playerCardsToCheck and cardOnDiscardPile");
//             return true;
//         }
//         else if (playerCardsToCheck[i].Color === "Wild" || playerCardsToCheck[i].Color  === "Wild Draw 4" || cardOnDiscardPile.Color === "Wild" || cardOnDiscardPile.Color  === "Wild Draw 4") {
//             console.log("There is a match between playerCardsToCheck and cardOnDiscardPile");
//             return true;
//         }
//     }
//     console.log("There is no match between playerCardsToCheck and cardOnDiscardPile");
//     return false;
// }

//Event Listeners
drawCardInput.addEventListener("click", drawCard);
startGame.addEventListener("click", dealCardsAtStart);

console.log(allPlayer1CardSlots);
//Event listener for every card slot for each player

// document.addEventListener("DOMContentLoaded", function() {
//     let allPlayer1CardSlots = document.getElementsByClassName("cardsPlayer1");
//     for (let i = 0; i < allPlayer1CardSlots.length; i++) {
//         allPlayer1CardSlots[i].addEventListener("click",drawCard);
//     }
// })