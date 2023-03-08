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
let cardOnDiscardPile = [];


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
    cardOnDiscardPile = drawCard();
    displayDiscardPileCard.innerHTML = `Color: ${cardOnDiscardPile.Color} Value: ${cardOnDiscardPile.Value}`;
    console.log(`Discard Pile Card, Color: ${cardOnDiscardPile.Color} Value: ${cardOnDiscardPile.Value}`);
    for (let i = 0; i < 7; i++) {
        player1Cards[i] = drawCard();
        player2Cards[i] = drawCard();
        addCardToPlayer1(player1Cards[i], cardOnDiscardPile, player1Cards);
        addCardToPlayer2(player2Cards[i], cardOnDiscardPile, player2Cards);
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
    console.log(cardOnDiscardPile);
}

function addCardToPlayer1(player1Card, cardOnDiscardPile) {
    let newCardOnPlayer1Board = document.createElement("div");
    newCardOnPlayer1Board.innerHTML = `Color: ${player1Card.Color} Value: ${player1Card.Value}`;
    newCardOnPlayer1Board.value = player1Card;
    newCardOnPlayer1Board.classList.add("cardsPlayer1");
    player1CardsInHand.appendChild(newCardOnPlayer1Board);
    console.log(cardOnDiscardPile);    
    //Event Listener for new cards added to the player's hand 
    // newCardOnPlayer1Board.addEventListener("mouseover", () => checkForMatch(newCardOnPlayer1Board.value,cardOnDiscardPile));
    newCardOnPlayer1Board.addEventListener("click", () => discardCard(newCardOnPlayer1Board.value, player1Cards, player1Turn, player2Turn));
    player1Stats.innerHTML = `Player 1 has ${player1Cards.length} cards in their hand`;
    return;
}

function addCardToPlayer2(player2Card, cardOnDiscardPile) {
    let newCardOnPlayer2Board = document.createElement("div");
    newCardOnPlayer2Board.innerHTML = `Color: ${player2Card.Color} Value: ${player2Card.Value}`;
    newCardOnPlayer2Board.value = player2Card;
    newCardOnPlayer2Board.classList.add("cardsPlayer2");
    player2CardsInHand.appendChild(newCardOnPlayer2Board);
    console.log(cardOnDiscardPile);    
    //Event Listener for new cards added to the player's hand 
    // newCardOnPlayer2Board.addEventListener("mouseover", () => checkForMatch(newCardOnPlayer2Board.value,cardOnDiscardPile));
    newCardOnPlayer2Board.addEventListener("click", () => discardCard(newCardOnPlayer2Board.value, player2Cards, player1Turn, player2Turn));
    player2Stats.innerHTML = `Player 2 has ${player2Cards.length} cards in their hand`;
    return;
}

function endTurn() {
    console.log(cardOnDiscardPile);
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
    console.log(cardOnDiscardPile);
    if (player1Turn === true && player2Turn === false) {
        player1Display = true;
        player2Display = false;
        currentPlayer = player1Cards;
    } else if (player1Turn === false && player2Turn === true) {
        player1Display = false;
        player2Display = true;
        currentPlayer = player2Cards;
    }
    //removed the game prompts by class after clicking start turn button
    document.querySelector(".newGamePrompt").remove();
    setDisplay(player1Display, player2Display);
    return;
}

function checkForMatch(playerCardToCheck, cardOnDiscardPile) {
    console.log(playerCardToCheck);
    console.log(cardOnDiscardPile);
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

function discardCard(playerCardToCheck, playerCards, player1Turn, player2Turn) {
    console.log(cardOnDiscardPile);
    if (checkForMatch(playerCardToCheck, cardOnDiscardPile) === true) {
        cardOnDiscardPile = playerCardToCheck;
        console.log(cardOnDiscardPile);
        displayDiscardPileCard.innerHTML = `Color: ${cardOnDiscardPile.Color} Value: ${cardOnDiscardPile.Value}`;
        for (let i = 0; i < playerCards.length; i++) {
            if (playerCards[i] === playerCardToCheck) {
                playerCards.splice(i, 1);
            }
        }
        if (player1Turn === true && player2Turn === false) {
            for (let i = 0; i < player1CardsInHand.children.length; i++) {
                if (playerCardToCheck === player1CardsInHand.children[i].value) {
                    player1CardsInHand.children[i].remove();
                }
            }
        }
        if (player1Turn === false && player2Turn === true) {
            for (let i = 0; i < player2CardsInHand.children.length; i++) {
                if (playerCardToCheck === player2CardsInHand.children[i].value) {
                    player2CardsInHand.children[i].remove();
                }
            }
        }
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `The card you selected matches what's on the discard pile!`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");    
        player1Stats.innerHTML = `Player 1 has ${player1Cards.length} cards in their hand`;
        player2Stats.innerHTML = `Player 2 has ${player2Cards.length} cards in their hand`;
        draw2Discarded(playerCardToCheck, cardOnDiscardPile);
        wildCardDiscarded(playerCardToCheck, cardOnDiscardPile);
        console.log(cardOnDiscardPile);
        wildCardDraw4Discarded(playerCardToCheck, cardOnDiscardPile);
        console.log(cardOnDiscardPile);
        skipDiscarded(playerCardToCheck, cardOnDiscardPile);
        console.log(cardOnDiscardPile);
        endTurn();
        return cardOnDiscardPile;
    }
    else if (checkForMatch(playerCardToCheck, cardOnDiscardPile) === false) {
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `The card you selected does not match what's on the discard pile; select another card from your hand or draw a card from the card deck.`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
    }
}

function draw2Discarded(playerCardToCheck, cardOnDiscardPile) {
    if (playerCardToCheck.Value === "Draw 2" && player1Turn === true && player2Turn === false) {
        for (let i = 0; i < 2; i++) {
            player2Cards.push(drawCard());
            addCardToPlayer2(player2Cards[player2Cards.length-1], cardOnDiscardPile);
        }
        setDisplay(true, false);
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Draw 2 was discarded! Opposing player draws 2 cards to their hand.`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        return; 
    }
    else if (playerCardToCheck.Value === "Draw 2" && player1Turn === false && player2Turn === true) {
        for (let i = 0; i < 2; i++) {
            player1Cards.push(drawCard());
            addCardToPlayer1(player1Cards[player1Cards.length-1], cardOnDiscardPile);
        }
        setDisplay(false,true);
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Draw 2 was discarded! Opposing player draws 2 cards to their hand.`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        return;
    }   
}

function wildCardDiscarded(playerCardToCheck, cardOnDiscardPile) {
    if (playerCardToCheck.Color === "Wild" && player1Turn === true && player2Turn === false) {
        
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Wild Card was discarded! Choose new color.`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        createButtons(cardOnDiscardPile);
        return; 
    }
    else if (playerCardToCheck.Color === "Wild" && player1Turn === false && player2Turn === true) {
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Wild Card was discarded! Choose new color.`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        createButtons(cardOnDiscardPile);
        return;
    }  
}

function wildCardDraw4Discarded(playerCardToCheck, cardOnDiscardPile) {
    if (playerCardToCheck.Color === "Wild Draw 4" && player1Turn === true && player2Turn === false) {
        for (let i = 0; i < 4; i++) {
            player2Cards.push(drawCard());
            addCardToPlayer2(player2Cards[player2Cards.length-1], cardOnDiscardPile);
        }
        setDisplay(true,false);
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Wild Draw 4 was discarded! Opposing player draws 4 cards to their hand. Select a color to play with.`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        createButtons(cardOnDiscardPile);
        return; 
    }
    else if (playerCardToCheck.Color === "Wild Draw 4" && player1Turn === false && player2Turn === true) {
        for (let i = 0; i < 4; i++) {
            player1Cards.push(drawCard());
            addCardToPlayer1(player1Cards[player1Cards.length-1], cardOnDiscardPile);
        }
        setDisplay(false,true);
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Wild Draw 4 was discarded! Opposing player draws 4 cards to their hand. Select a color to play with.`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        createButtons(cardOnDiscardPile);
        return;
    }  
}

function skipDiscarded(playerCardToCheck, cardOnDiscardPile) {
    if (playerCardToCheck.Value === "Skip" && player1Turn === true && player2Turn === false) {
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Skip was used! Opposing player lost their turn.`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        return; 
    }
    else if (playerCardToCheck.Value === "Skip" && player1Turn === false && player2Turn === true) {
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Skip was used! Opposing player lost their turn.`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        return;
    }   
}

function addCardToHand() {
    console.log(cardOnDiscardPile);
    if (player1Turn === true && player2Turn === false) {
        player1Cards[player1Cards.length] = drawCard();
        addCardToPlayer1(player1Cards[player1Cards.length-1], cardOnDiscardPile);
    }
    else if (player1Turn === false && player2Turn === true) {
        player2Cards[player2Cards.length] = drawCard();
        addCardToPlayer2(player2Cards[player2Cards.length-1], cardOnDiscardPile);
    }
}

function createButtons(cardOnDiscardPile) {
    console.log(cardOnDiscardPile);
    let newGreenBtn = document.createElement("button");
    newGreenBtn.classList.add("wildCardButton");
    newGreenBtn.innerHTML = "Green";
    gamePromptSection.appendChild(newGreenBtn);
    let newRedBtn = document.createElement("button");
    newRedBtn.classList.add("wildCardButton");
    newRedBtn.innerHTML = "Red";
    gamePromptSection.appendChild(newRedBtn);
    let newBlueBtn = document.createElement("button");
    newBlueBtn.classList.add("wildCardButton");
    newBlueBtn.innerHTML = "Blue";
    gamePromptSection.appendChild(newBlueBtn);
    let newYellowBtn = document.createElement("button");
    newYellowBtn.classList.add("wildCardButton");
    newYellowBtn.innerHTML = "Yellow";
    gamePromptSection.appendChild(newYellowBtn);
    newBlueBtn.addEventListener("click", () => {
        cardOnDiscardPile = {Color: "Blue", Value: "N/A"};
        displayDiscardPileCard.innerHTML = `Color: ${cardOnDiscardPile.Color} Value: ${cardOnDiscardPile.Value}`;
        console.log(cardOnDiscardPile);
        for (let i = gamePromptSection.children.length-1; i > 0; i--) {
            if (gamePromptSection.children[i].tagName === "BUTTON") {
                gamePromptSection.children[i].remove();
            }
        }
        return cardOnDiscardPile;
    });
    newRedBtn.addEventListener("click", () => {
        cardOnDiscardPile = {Color: "Red", Value: "N/A"};
        displayDiscardPileCard.innerHTML = `Color: ${cardOnDiscardPile.Color} Value: ${cardOnDiscardPile.Value}`;
        console.log(cardOnDiscardPile);
        for (let i = gamePromptSection.children.length-1; i > 0; i--) {
            if (gamePromptSection.children[i].tagName === "BUTTON") {
                gamePromptSection.children[i].remove();
            }
        }
        return cardOnDiscardPile;
    });
    newGreenBtn.addEventListener("click", () => {
        cardOnDiscardPile = {Color: "Green", Value: "N/A"};
        displayDiscardPileCard.innerHTML = `Color: ${cardOnDiscardPile.Color} Value: ${cardOnDiscardPile.Value}`;
        console.log(cardOnDiscardPile);
        for (let i = gamePromptSection.children.length-1; i > 0; i--) {
            if (gamePromptSection.children[i].tagName === "BUTTON") {
                gamePromptSection.children[i].remove();
            }
        }
        return cardOnDiscardPile;
    });
    newYellowBtn.addEventListener("click", () => {
        cardOnDiscardPile = {Color: "Yellow", Value: "N/A"};
        displayDiscardPileCard.innerHTML = `Color: ${cardOnDiscardPile.Color} Value: ${cardOnDiscardPile.Value}`;
        console.log(cardOnDiscardPile);
        for (let i = gamePromptSection.children.length-1; i > 0; i--) {
            if (gamePromptSection.children[i].tagName === "BUTTON") {
                gamePromptSection.children[i].remove();
            }
        }
        return cardOnDiscardPile;
    });
}

function unoChecker() {
//if the unoChecker goes through and the player calls it and their hand only has one card left, print in Game prompt "One card left!" If the uno checker goes through but the person calling does not have one card left, add four cards and print game prompt "There was a mistake! Four cards added as a penalty!"
}

//Event Listeners
drawCardInput.addEventListener("click", addCardToHand);
startGame.addEventListener("click", dealCardsAtStart);
endTurnBtn.addEventListener("click", endTurn);
startTurnBtn.addEventListener("click", startTurn);