//Grabbing elements from DOM
let drawCardInput = document.querySelector(".deckCards");
let gameInstructions = document.querySelector(".gameInstructions");
let startGame = document.querySelector(".startGameButton");
let uno1CardCall = document.querySelector(".unoButton1Card");
let unoOppPlayerForgotCall = document.querySelector(".unoButtonForgot")
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
let gamePromptsDisplayed = document.getElementsByClassName("newGamePrompt");
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
let unoCounter = false;
let deck = [];


//Establishing the deck of cards with arrays and objects
const colors = ["Blue", "Red", "Yellow", "Green"];
const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Skip", "Draw +2"];
const wildCards = ["Wild", "Wild +4"];

//Creating deck of cards along with function for shuffling deck, credit to: https://www.programiz.com/javascript/examples/shuffle-card

//Functions
function createDeckOfCards() {
    for (let i = 0; i < colors.length; i++) {
        for (let j = 0; j < values.length; j++) {
            let card = {Color: colors[i], Value: values[j]};
            deck.push(card);
            if (card.Value === "Skip" || card.Value === "Draw +2") {
                deck.push(card);
            }
        }
    }
    return;
}

function createWildCards() {
    for (let i = 0; i < wildCards.length; i++) {
        for (let j = 0; j < 4; j++) {
            let card = {Color: wildCards[i], Value: "Wild"};
            if (card.Color === "Wild +4") {
                card.Value = "Draw +4"
            }
            deck.push(card);
        }
    }
    return;
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random()*i);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return;
}

function drawCard() {
    shuffleDeck();
    let cardBeingDrawn = [];
    cardBeingDrawn = deck[Math.floor(Math.random()*(deck.length))];
    deck.pop(cardBeingDrawn);
    return cardBeingDrawn;
}

function addCardToHand() {
    console.log(cardOnDiscardPile);
    if (player1Turn === true && player2Turn === false) {
        player1Cards[player1Cards.length] = drawCard();
        addCardToPlayer1(player1Cards[player1Cards.length-1]);
    }
    else if (player1Turn === false && player2Turn === true) {
        player2Cards[player2Cards.length] = drawCard();
        addCardToPlayer2(player2Cards[player2Cards.length-1]);
    }
    return;
}

function dealCardsAtStart() {
    for (let i = player1CardsInHand.children.length-1; i >= 0; i--) {
        player1CardsInHand.children[i].remove();
    }
    for (let i = player2CardsInHand.children.length-1; i >= 0; i--) {
        player2CardsInHand.children[i].remove();
    }
    player1Cards = [];
    player2Cards = [];
    cardOnDiscardPile = [];
    deck = [];
    createDeckOfCards();
    createWildCards();
    cardOnDiscardPile = drawCard();
    displayDiscardPileCard.innerHTML = `${cardOnDiscardPile.Value}`;
    addColorToDiscardPile(cardOnDiscardPile);
    for (let i = 0; i < 7; i++) {
        player1Cards[i] = drawCard();
        player2Cards[i] = drawCard();
        addCardToPlayer1(player1Cards[i]);
        addCardToPlayer2(player2Cards[i]);  
    }
    currentPlayer = player1Cards;
    player1Display = true;
    player2Display = false;
    setDisplay(player1Display, player2Display);
    player1Turn = true;
    player2Turn = false;
    return;
}

function addCardToPlayer1(player1Card) {
    let newCardOnPlayer1Board = document.createElement("div");
    newCardOnPlayer1Board.innerHTML = `${player1Card.Value}`;
    newCardOnPlayer1Board.value = player1Card;
    newCardOnPlayer1Board.classList.add("cardsPlayer1");
    addColorToCards(newCardOnPlayer1Board);
    player1CardsInHand.appendChild(newCardOnPlayer1Board);
    newCardOnPlayer1Board.addEventListener("mouseover", () => checkForMatch(newCardOnPlayer1Board.value));
    newCardOnPlayer1Board.addEventListener("click", () => discardCard(newCardOnPlayer1Board.value, player1Cards, player1Turn, player2Turn));
    player1Stats.innerHTML = `Player 1 has ${player1Cards.length} cards in their hand`;
    return;
}

function addCardToPlayer2(player2Card) {
    let newCardOnPlayer2Board = document.createElement("div");
    newCardOnPlayer2Board.innerHTML = `${player2Card.Value}`;
    newCardOnPlayer2Board.value = player2Card;
    newCardOnPlayer2Board.classList.add("cardsPlayer2");
    addColorToCards(newCardOnPlayer2Board); 
    player2CardsInHand.appendChild(newCardOnPlayer2Board);   
    newCardOnPlayer2Board.addEventListener("mouseover", () => checkForMatch(newCardOnPlayer2Board.value));
    newCardOnPlayer2Board.addEventListener("click", () => discardCard(newCardOnPlayer2Board.value, player2Cards, player1Turn, player2Turn));
    player2Stats.innerHTML = `Player 2 has ${player2Cards.length} cards in their hand`;
    return;
}

function addColorToDiscardPile(cardOnDiscardPile) {
    console.log(cardOnDiscardPile);
    if (cardOnDiscardPile.Color === "Blue") {
        displayDiscardPileCard.classList.remove("redCard", "greenCard", "yellowCard", "wildCard");
        displayDiscardPileCard.classList.add("blueCard");
    }
    else if (cardOnDiscardPile.Color === "Red") {
        displayDiscardPileCard.classList.remove("blueCard", "greenCard", "yellowCard", "wildCard");
        displayDiscardPileCard.classList.add("redCard");
    }
    else if (cardOnDiscardPile.Color === "Green") {
        displayDiscardPileCard.classList.remove("redCard", "blueCard", "yellowCard", "wildCard");
        displayDiscardPileCard.classList.add("greenCard");
    }
    else if (cardOnDiscardPile.Color === "Yellow") {
        displayDiscardPileCard.classList.remove("redCard", "greenCard", "blueCard", "wildCard");
        displayDiscardPileCard.classList.add("yellowCard");
    }
    else if (cardOnDiscardPile.Color === "Wild" || cardOnDiscardPile.Color === "Wild +4") {
        displayDiscardPileCard.classList.remove("redCard", "greenCard", "yellowCard", "blueCard");
        displayDiscardPileCard.classList.add("wildCard");
    }
    return;
}

function addColorToCards(newCardOnPlayerBoard) {
    if (newCardOnPlayerBoard.value.Color === "Blue") {
        newCardOnPlayerBoard.classList.add("blueCard");
    }
    else if (newCardOnPlayerBoard.value.Color === "Red") {
        newCardOnPlayerBoard.classList.add("redCard");
    }
    else if (newCardOnPlayerBoard.value.Color === "Green") {
        newCardOnPlayerBoard.classList.add("greenCard");
    }
    else if (newCardOnPlayerBoard.value.Color === "Yellow") {
        newCardOnPlayerBoard.classList.add("yellowCard");
    }
    else if (newCardOnPlayerBoard.value.Color === "Wild" || newCardOnPlayerBoard.value.Color === "Wild +4") {
        newCardOnPlayerBoard.classList.add("wildCard");
    }
    return;
}

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
    for (let i = gamePromptsDisplayed.length-1; i >= 0; i--) {
        gamePromptsDisplayed[i].style.display = "none";
    }
    setDisplay(player1Display, player2Display);
    return;
}

function checkForMatch(playerCardToCheck) {
    console.log(playerCardToCheck);
    console.log(cardOnDiscardPile);
    if (playerCardToCheck.Value === cardOnDiscardPile.Value || playerCardToCheck.Color === cardOnDiscardPile.Color) {
        console.log("There is a Match with Discard Pile");
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `This card matches what's on the discard pile!`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");  
        return true;
    }
    else if (playerCardToCheck.Color === "Wild" || playerCardToCheck.Color  === "Wild +4" || cardOnDiscardPile.Color === "Wild" || cardOnDiscardPile.Color  === "Wild +4") {
        console.log("There is a Match with Discard Pile");
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `This card matches what's on the discard pile!`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");  
        return true;
    }
    console.log("Not a Match with Discard Pile");
    document.querySelector(".newGamePrompt").remove();
    let newGamePrompt = document.createElement("div");
    newGamePrompt.innerHTML = `This card does not match what's on the discard pile.`;
    gamePromptSection.appendChild(newGamePrompt);
    newGamePrompt.classList.add("newGamePrompt");
    return false;
}

function discardCard(playerCardToCheck, playerCards, player1Turn, player2Turn) {
    console.log(cardOnDiscardPile);
    if (checkForMatch(playerCardToCheck) === true) {
        cardOnDiscardPile = playerCardToCheck;
        console.log(cardOnDiscardPile);
        displayDiscardPileCard.innerHTML = `${cardOnDiscardPile.Value}`;
        addColorToDiscardPile(cardOnDiscardPile);
        for (let i = 0; i < playerCards.length; i++) {
            if (playerCards[i] === playerCardToCheck) {
                playerCards.splice(i, 1);
                i = playerCards.length;
            }
        }
        if (player1Turn === true && player2Turn === false) {
            for (let i = 0; i < player1CardsInHand.children.length; i++) {
                if (playerCardToCheck === player1CardsInHand.children[i].value) {
                    player1CardsInHand.children[i].remove();
                    i = player1CardsInHand.children.length;
                }
            }
        }
        if (player1Turn === false && player2Turn === true) {
            for (let i = 0; i < player2CardsInHand.children.length; i++) {
                if (playerCardToCheck === player2CardsInHand.children[i].value) {
                    player2CardsInHand.children[i].remove();
                    i = player2CardsInHand.children.length;
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
        draw2Discarded(playerCardToCheck);
        wildCardDiscarded(playerCardToCheck);
        console.log(cardOnDiscardPile);
        wildCardDraw4Discarded(playerCardToCheck);
        console.log(cardOnDiscardPile);
        skipDiscarded(playerCardToCheck);
        console.log(cardOnDiscardPile);
        endTurn();
        return;
    }
    else if (checkForMatch(playerCardToCheck) === false) {
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `The card you selected does not match what's on the discard pile; select another card from your hand or draw a card from the card deck.`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        return;
    }
}

function draw2Discarded(playerCardToCheck) {
    if (playerCardToCheck.Value === "Draw +2" && player1Turn === true && player2Turn === false) {
        for (let i = 0; i < 2; i++) {
            player2Cards.push(drawCard());
            addCardToPlayer2(player2Cards[player2Cards.length-1]);
        }
        setDisplay(true, false);
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Draw 2 was discarded! Opposing player draws 2 cards to their hand.`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        return; 
    }
    else if (playerCardToCheck.Value === "Draw +2" && player1Turn === false && player2Turn === true) {
        for (let i = 0; i < 2; i++) {
            player1Cards.push(drawCard());
            addCardToPlayer1(player1Cards[player1Cards.length-1]);
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

function wildCardDiscarded(playerCardToCheck) {
    if (playerCardToCheck.Color === "Wild" && player1Turn === true && player2Turn === false) {
        
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Wild Card was discarded! Choose new color.`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        console.log(cardOnDiscardPile);
        createButtons();
        console.log(cardOnDiscardPile);
        return; 
    }
    else if (playerCardToCheck.Color === "Wild" && player1Turn === false && player2Turn === true) {
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Wild Card was discarded! Choose new color.`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        console.log(cardOnDiscardPile);
        createButtons();
        console.log(cardOnDiscardPile);
        return;
    }  
}

function wildCardDraw4Discarded(playerCardToCheck) {
    if (playerCardToCheck.Color === "Wild +4" && player1Turn === true && player2Turn === false) {
        for (let i = 0; i < 4; i++) {
            player2Cards.push(drawCard());
            addCardToPlayer2(player2Cards[player2Cards.length-1]);
        }
        setDisplay(true,false);
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Wild Draw 4 was discarded! Opposing player draws 4 cards to their hand. Select a color to play with.`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        createButtons();
        return; 
    }
    else if (playerCardToCheck.Color === "Wild +4" && player1Turn === false && player2Turn === true) {
        for (let i = 0; i < 4; i++) {
            player1Cards.push(drawCard());
            addCardToPlayer1(player1Cards[player1Cards.length-1]);
        }
        setDisplay(false,true);
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Wild Draw 4 was discarded! Opposing player draws 4 cards to their hand. Select a color to play with.`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        createButtons();
        return;
    }  
}

function skipDiscarded(playerCardToCheck) {
    if (playerCardToCheck.Value === "Skip" && player1Turn === true && player2Turn === false) {
        endTurn();
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Skip was used! Opposing player lost their turn.`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        return; 
    }
    else if (playerCardToCheck.Value === "Skip" && player1Turn === false && player2Turn === true) {
        endTurn();
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Skip was used! Opposing player lost their turn.`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        return;
    }   
}

function createButtons() {
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
        cardOnDiscardPile = {Color: "Blue", Value: "Blue"};
        displayDiscardPileCard.innerHTML = `${cardOnDiscardPile.Value}`;
        addColorToDiscardPile(cardOnDiscardPile);
        console.log(cardOnDiscardPile);
        for (let i = gamePromptSection.children.length-1; i > 0; i--) {
            if (gamePromptSection.children[i].tagName === "BUTTON") {
                gamePromptSection.children[i].remove();
            }
        }
        return;
    });
    newRedBtn.addEventListener("click", () => {
        cardOnDiscardPile = {Color: "Red", Value: "Red"};
        displayDiscardPileCard.innerHTML = `${cardOnDiscardPile.Value}`;
        addColorToDiscardPile(cardOnDiscardPile);
        console.log(cardOnDiscardPile);
        for (let i = gamePromptSection.children.length-1; i > 0; i--) {
            if (gamePromptSection.children[i].tagName === "BUTTON") {
                gamePromptSection.children[i].remove();
            }
        }
        return;
    });
    newGreenBtn.addEventListener("click", () => {
        cardOnDiscardPile = {Color: "Green", Value: "Green"};
        displayDiscardPileCard.innerHTML = `${cardOnDiscardPile.Value}`;
        addColorToDiscardPile(cardOnDiscardPile);
        console.log(cardOnDiscardPile);
        for (let i = gamePromptSection.children.length-1; i > 0; i--) {
            if (gamePromptSection.children[i].tagName === "BUTTON") {
                gamePromptSection.children[i].remove();
            }
        }
        return;
    });
    newYellowBtn.addEventListener("click", () => {
        cardOnDiscardPile = {Color: "Yellow", Value: "Yellow"};
        displayDiscardPileCard.innerHTML = `${cardOnDiscardPile.Value}`;
        addColorToDiscardPile(cardOnDiscardPile);
        console.log(cardOnDiscardPile);
        for (let i = gamePromptSection.children.length-1; i > 0; i--) {
            if (gamePromptSection.children[i].tagName === "BUTTON") {
                gamePromptSection.children[i].remove();
            }
        }
        return;
    });
    console.log(cardOnDiscardPile);
}

function unoChecker() {
    //need to fix this
    if (player1Turn === true && player2Turn === false) {
        if (player1Cards.length > 1) {
            document.querySelector(".newGamePrompt").remove();
            let newGamePrompt = document.createElement("div");
            newGamePrompt.innerHTML = `Uno was called, but the player calling Uno has more than 1 card in their hand! 4 cards added to the player's hand!`;
            gamePromptSection.appendChild(newGamePrompt);
            newGamePrompt.classList.add("newGamePrompt");
            for (let i = 0; i < 4; i++) {
                player1Cards.push(drawCard());
                addCardToPlayer1(player1Cards[player1Cards.length-1], cardOnDiscardPile);
            }
            unoCounter = false;
        }
        else if (player1Cards.length === 1) {
            document.querySelector(".newGamePrompt").remove();
            let newGamePrompt = document.createElement("div");
            newGamePrompt.innerHTML = `Uno! Player 1 has only one card left!`;
            gamePromptSection.appendChild(newGamePrompt);
            newGamePrompt.classList.add("newGamePrompt");
            unoCounter  = true;
        }
        return;
    }
    else if (player1Turn === false && player2Turn === true) {
        if (player2Cards.length > 1) {
            document.querySelector(".newGamePrompt").remove();
            let newGamePrompt = document.createElement("div");
            newGamePrompt.innerHTML = `Uno was called, but the player calling Uno has more than 1 card in their hand! 4 cards added to the player's hand!`;
            gamePromptSection.appendChild(newGamePrompt);
            newGamePrompt.classList.add("newGamePrompt");
            for (let i = 0; i < 4; i++) {
                player2Cards.push(drawCard());
                addCardToPlayer2(player2Cards[player2Cards.length-1], cardOnDiscardPile);
            }
            noCounter = false;
        }
        else if (player2Cards.length === 1) {
            document.querySelector(".newGamePrompt").remove();
            let newGamePrompt = document.createElement("div");
            newGamePrompt.innerHTML = `Uno! Player 2 has only one card left!`;
            gamePromptSection.appendChild(newGamePrompt);
            newGamePrompt.classList.add("newGamePrompt");
            unoCounter  = true;
        }
        return;
    }
}

function unoOppPlayerCallChecker() {
    if (player1Turn === true && player2Turn === false && unoCounter === true && player2Cards.length === 1) {
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Uno was called correctly by opposing player. 4 cards added to the player for incorrectly accusing other player!`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        for (let i = 0; i < 4; i++) {
            player1Cards.push(drawCard());
            addCardToPlayer1(player1Cards[player1Cards.length-1], cardOnDiscardPile);
        }
        return;
    }
    else if (player1Turn === true && player2Turn === false && unoCounter === false && player2Cards.length === 1) {
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Opposing player forgot to call Uno when they had 1 card left! 4 cards added to player 2!`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        for (let i = 0; i < 4; i++) {
            player2Cards.push(drawCard());
            addCardToPlayer2(player2Cards[player2Cards.length-1], cardOnDiscardPile);
        }
        return;
    }
    else if (player1Turn === true && player2Turn === false && unoCounter === false && player2Cards.length != 1) {
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Opposing player did not call Uno as they still have more than 1 card in their hand! 4 cards added to player 1 for incorrectly calling Uno!`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        for (let i = 0; i < 4; i++) {
            player1Cards.push(drawCard());
            addCardToPlayer1(player1Cards[player1Cards.length-1], cardOnDiscardPile);
        }
        return;
    }
    else if (player2Turn === true && player1Turn === false && unoCounter === true && player1Cards.length === 1) {
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Uno was called correctly by opposing player. 4 cards added to the player for incorrectly accusing other player!`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        for (let i = 0; i < 4; i++) {
            player2Cards.push(drawCard());
            addCardToPlayer2(player2Cards[player2Cards.length-1], cardOnDiscardPile);
        }
        return;
    }
    else if (player2Turn === true && player1Turn === false && unoCounter === false && player1Cards.length === 1) {
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Opposing player forgot to call Uno when they had 1 card left! 4 cards added to player 1!`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        for (let i = 0; i < 4; i++) {
            player1Cards.push(drawCard());
            addCardToPlayer1(player1Cards[player1Cards.length-1], cardOnDiscardPile);
        }
        return;
    }
    else if (player2Turn === true && player1Turn === false && unoCounter === false && player1Cards.length != 1) {
        document.querySelector(".newGamePrompt").remove();
        let newGamePrompt = document.createElement("div");
        newGamePrompt.innerHTML = `Opposing player did not call Uno as they still have more than 1 card in their hand! 4 cards added to player 2 for incorrectly calling Uno!`;
        gamePromptSection.appendChild(newGamePrompt);
        newGamePrompt.classList.add("newGamePrompt");
        for (let i = 0; i < 4; i++) {
            player2Cards.push(drawCard());
            addCardToPlayer2(player2Cards[player2Cards.length-1], cardOnDiscardPile);
        }
        return;
    }
}

function postGameInstructions() {
    document.querySelector(".newGamePrompt").remove();
    let newGamePrompt = document.createElement("div");
    newGamePrompt.innerHTML = `Use the "Start New Game" button when Player 1 is ready to start the game. Each player starts out with 7 random cards in their hand. A card will be placed on the board from the card deck. The first player will see if they can play a corresponding card (matching by color or number to the card displayed on the discard pile) from the cards in their hand. If they are unable to, they must draw a card. At the end of the turn, that player must click on the "End Turn" button. Each player will click on "Start Turn" button to reveal only their own cards during their turn. The first player to get rid of all of their cards in their hand wins. *If at any point a player only has one card left in their hand, they must acknowledge this by clicking on the "Uno" button before they end their turn. Or else, if the opposing player clicks "Uno" on the following turn, the player who failed to acknowledge "Uno" while only having one card left in their hand must draw four cards to their hand.`;
    gamePromptSection.appendChild(newGamePrompt);
    newGamePrompt.classList.add("newGamePrompt");
    return;
}

function checkForWinner() {
    //invoke either at end of discardedCard function or after endTurn function
}

//Event Listeners
drawCardInput.addEventListener("click", addCardToHand);
startGame.addEventListener("click", dealCardsAtStart);
endTurnBtn.addEventListener("click", endTurn);
startTurnBtn.addEventListener("click", startTurn);
uno1CardCall.addEventListener("click", unoChecker);
unoOppPlayerForgotCall.addEventListener("click", unoOppPlayerCallChecker);
gameInstructions.addEventListener("click", postGameInstructions);