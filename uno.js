//Grabbing elements from DOM
let drawCardInput = document.querySelector(".deckCards");
let startGame = document.querySelector(".startGameButton");
let unoCall = document.querySelector(".unoButton");
let startTurnBtn = document.querySelector(".startTurnButton");
let endTurnBtn = document.querySelector(".endTurnButton");
let player1CardsInHand = document.querySelector("#player1Hand");
let player2CardsInHand = document.querySelector("#player2Hand");
let cardPileOutput = document.querySelector("#cardPile");
let displayDrawCards = document.querySelector(".drawCards");
let displayDiscardPileCard = document.querySelector(".discardPileCard");
let allPlayer1CardSlots = document.getElementsByClassName("cardsPlayer1");
let allPlayer2CardSlots = document.getElementsByClassName
("cardsPlayer2");
let gamePromptSection = document.querySelector("#gamePrompts");
let player1Stats = document.querySelector("#player1Stats");
let player2Stats = document.querySelector("#player2Stats");

let player1Cards = [];
let player2Cards = [];
let currentPlayer = [];
let player1Display = false;
let player2Display = false;
let player1Turn = false;
let player2Turn = true;
let cardCounterPlayer1 = 0;
let cardCounterPlayer2 = 0;



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
function setDisplay(player1Display, player2Display) {
    if (player1Display === true && player2Display === false) {
        for (let i = 0; i<allPlayer1CardSlots.length; i++) {
            allPlayer1CardSlots[i].style.display = "flex";
        }
        for (let j = 0; j<allPlayer2CardSlots.length; j++) {
            allPlayer2CardSlots[j].style.display = "none";
        }
        return;
    } else if (player2Display === true && player1Display === false) {
        for (let i = 0; i<allPlayer2CardSlots.length; i++) {
            allPlayer2CardSlots[i].style.display = "flex";
        }
        for (let j = 0; j<allPlayer1CardSlots.length; j++) {
            allPlayer1CardSlots[j].style.display = "none";
        }
        return;
    } else if (player1Display === false && player2Display === false) {
        for (let i = 0; i<allPlayer1CardSlots.length; i++) {
            allPlayer1CardSlots[i].style.display = "none";
        }
        for (let j = 0; j<allPlayer2CardSlots.length; j++) {
            allPlayer2CardSlots[j].style.display = "none";
        }
        return;
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
    deck.pop(cardBeingDrawn);
    console.log(cardBeingDrawn);
    return cardBeingDrawn;
}

function dealCardsAtStart() {
    console.log(deck.length);
    let cardOnDiscardPile = drawCard();
    displayDiscardPileCard.innerHTML = `Color: ${cardOnDiscardPile.Color} Value: ${cardOnDiscardPile.Value}`;
    console.log(`Discard Pile Card, Color: ${cardOnDiscardPile.Color} Value: ${cardOnDiscardPile.Value}`);
    for (let i = 0; i < 7; i++) {
        player1Cards[i] = drawCard();
        player2Cards[i] = drawCard();
        addCardToPlayer1(player1Cards[i], cardOnDiscardPile);
        addCardToPlayer2(player2Cards[i], cardOnDiscardPile);
        console.log(`Player 1 Card# ${i+1}, Color: ${player1Cards[i].Color} Value: ${player1Cards[i].Value}`);
        console.log(`Player 2 Card# ${i+1}, Color: ${player2Cards[i].Color} Value: ${player2Cards[i].Value}`);
    }
    // console.log(deck.length);
    // console.log(`allPlayer1CardSlots .length is: ${allPlayer1CardSlots.length}`);
    currentPlayer = player1Cards;
    player1Display = true;
    player2Display = false;
    setDisplay(player1Display, player2Display);
    player1Turn = true;
    player2Turn = false;
}

function addCardToPlayer1(player1Card, cardOnDiscardPile) {
    let newCardOnPlayer1Board = document.createElement("div");
    newCardOnPlayer1Board.innerHTML = `Color: ${player1Card.Color} Value: ${player1Card.Value}`;
    newCardOnPlayer1Board.value = player1Card;
    newCardOnPlayer1Board.classList.add("cardsPlayer1");
    player1CardsInHand.appendChild(newCardOnPlayer1Board);
    //Event Listeners for new cards added to the player's hand 
    newCardOnPlayer1Board.addEventListener("click", () => checkForMatch(newCardOnPlayer1Board.value,cardOnDiscardPile));
    // console.log(newCardOnPlayer1Board);
    // player1Stats.innerHTML = `Player 1 has ${(newCardOnPlayer1Board.length-1)} cards in their hand`;
    cardCounterPlayer1++;
    console.log(cardCounterPlayer1);
    player1Stats.innerHTML = `Player 1 has ${cardCounterPlayer1} cards in their hand`;
    return;
}

function addCardToPlayer2(player2Card, cardOnDiscardPile) {
    let newCardOnPlayer2Board = document.createElement("div");
    newCardOnPlayer2Board.innerHTML = `Color: ${player2Card.Color} Value: ${player2Card.Value}`;
    newCardOnPlayer2Board.value = player2Card;
    newCardOnPlayer2Board.classList.add("cardsPlayer2");
    player2CardsInHand.appendChild(newCardOnPlayer2Board);
    //Event Listeners for new cards added to the player's hand 
    newCardOnPlayer2Board.addEventListener("click", () => checkForMatch(newCardOnPlayer2Board.value,cardOnDiscardPile));
    // console.log(newCardOnPlayer2Board);
    // player2Stats.innerHTML = `Player 2 has ${(newCardOnPlayer2Board.length-1)} cards in their hand`;
    cardCounterPlayer2++;
    console.log(cardCounterPlayer2);
    player2Stats.innerHTML = `Player 2 has ${cardCounterPlayer2} cards in their hand`;
    return;
}

function checkForMatch(playerCardToCheck, cardOnDiscardPile) {
    if (playerCardToCheck.Value === cardOnDiscardPile.Value || playerCardToCheck.Color === cardOnDiscardPile.Color) {
        console.log("There is a Match with Discard Pile");
        return true;
    }
    else if (playerCardToCheck.Color === "Wild" || playerCardToCheck.Color  === "Wild Draw 4" || cardOnDiscardPile.Color === "Wild" || cardOnDiscardPile.Color  === "Wild Draw 4") {
        console.log("There is a Match with Discard Pile");
        return true;
    }
    console.log("Not a Match with Discard Pile");
    return false;
}

function endTurn() {
    player1Display = false;
    player2Display = false;
    setDisplay(player1Display, player2Display);
    if (player1Turn === true) {
        console.log("Player 2, click on start turn");
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Player 2, click on "Start Turn" button to reveal your cards and start your turn`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        player1Turn = false;
        player2Turn = true;
        return;
    }
    else if (player2Turn === true) {
        console.log("Player 1, click on start turn");
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Player 1, click on "Start Turn" button to reveal your cards and start your turn`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        player1Turn = true;
        player2Turn = false;
        return;
    }
}

function startTurn() {
    if (player1Turn === true && player2Turn === false) {
        player1Display = true;
        player2Display = false;
    } else if (player1Turn === false && player2Turn === true) {
        player1Display = false;
        player2Display = true;
    }
    //removed the game prompts by class after clicking start turn button
    document.querySelector(".newGamePrompt").remove();
    setDisplay(player1Display, player2Display);
    return;
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
endTurnBtn.addEventListener("click", endTurn);
startTurnBtn.addEventListener("click", startTurn);