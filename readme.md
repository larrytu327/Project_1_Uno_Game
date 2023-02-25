# Project 1 Game: Uno

## User Experience

- 2 Players, take turns according to gameplay rules to determine a winner
- Object of the game is for each player to get rid of the cards in their hand by playing specific cards that match either color or number/action that is on the game board or was previously played. Whichever player gets rid of all of their cards in their hand is the winner.
- Different cards that can be played (variables/factors to account for):
    - Colors for each card
        - Red, Green, Blue, Yellow
    - Numbers for each card (ie. 1-10)
    - Actions for special cards
        - Skip opposing player's turn
        - Draw 2 cards (this card has one of the four colors)
        - Draw 4 cards (this is a wild card which can be used any color and user can set the color for the next card to be played)
        - Reverse (**this doesn't apply so much with 2 player games, but could be addressed if game build out to include more players*)

## How to Play

- Each player starts out with 7 random cards in their hand
    - **Will need to think about how to reveal each player's hand without showing the opposing player their hand, maybe include a button to specify when the player is ready to reveal their hand to themselves or when the turn is over to reveal the hand to the user*.
- Decide who will start the game
    - **Use a button to randomly pick a player to start*
- The board will start off with a random card
- First player will see their cards in their hand and will select the card that they want to play
    - If there is no card in their hand that they can play, they will have to draw one random card from the board and add to their hand
- The turn will go to opposing player/user who will select a card from their hand that they can play based on what card is on the board
    - Same applies as previous user/player: if there is no card in their hand that they can play, they will have to draw one random card from the board and add to their hand.
- There is an "Uno" button that should be pressed by a player who only has one card left in their had, prior to ending their turn. If the opposing player presses this button on their turn while the other player has one card left in their hand, the player with one card in their hand will have to draw 4 additional cards to their hand as a punishment for not calling "Uno" prior to ending their turn.
    - **Will need to include an "Uno" button and a "End Turn" button*
- If a player who only has one card left and had already called "Uno" on their previous turn is able to play their final card on the board, that player is the winner.

## Wireframe

- **See attached screenshot in the repo for the wireframe*
- HTML site will have Player 1 and Player 2 sections
    - Each player's section will reveal their hand/cards when it is their turn and hide their hand during opposing player's turn
- Navigation bar or special section to the side will include relevant game info:
    - Which player's turn it is (*maybe include way at beginning of a game where player can submit their personalized name)
    - How many cards is in each player's hand
    - Counter for wins and losses accumulated by each player
- Main section for game board
    - The card that is played on the board
    - A button to draw a card (if game play dictates that)
- Section that includes prompts from the game to reinforce/remind players of the rules
- Will need to create an array that includes all the cards that can be picked from (there is a limited number of cards to draw from in the deck).

## Future considerations for building out

- Be able to play with more than 2 players
- Be able to include additional action cards (ie. reverse,
    - Allow players to establish a new action card and specify new rules
- Allow players to "cut in" by putting down a card that matches identically to what is on the board, even out of turn.
- Having a timer to limit how much time a player gets on their turn, or else it skips their turn.
- Allow the game to played on a shared network, each player would have their own browser; no need to share a single browser among the players.
    - This would improve gameplay experience, allow for more interactivity among players (e,g. cutting in)