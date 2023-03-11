# Project 1 Game: Uno

## User Experience

- 2 Players, take turns according to gameplay rules to determine a winner
- Object of the game is for each player to get rid of the cards in their hand by playing specific cards that match either color or number/action that is on the game board or was previously played. Whichever player gets rid of all of their cards in their hand is the winner.
- Different cards that can be played (variables/factors to account for):
    - Colors for each card
        - Red, Green, Blue, Yellow
    - Numbers for each card (ie. 0-9)
    - Actions for special cards
        - Skip opposing player's turn
        - Draw 2 cards (this card has one of the four colors)
        - Draw 4 cards (this is a wild card which can be used any color and user can set the color for the next card to be played)
        -Wild card (allows player to pick a new color to force the opposing player to play)
        - Reverse (**this doesn't apply so much with 2 player games, but could be addressed if game build out to include more players*)

## How to Play

- Each player starts out with 7 random cards in their hand
- The board will start off with a random card on the discard pile
- First player will see their cards in their hand and will select the card that they want to play
    - If there is no card in their hand that they can play, they will have to draw one random card from the card deck and add to their hand
- The turn will go to opposing player/user who will select a card from their hand that they can play based on what card is on the board
    - Same applies as previous user/player: if there is no card in their hand that they can play, they will have to draw one random card from the board and add to their hand.
- There are two "Uno" buttons; one Uno button should be pressed by a player who only has one card left in their had, prior to ending their turn. If the opposing player presses the other Uno button on their turn while the other player has one card left in their hand, the player with one card in their hand will have to draw 4 additional cards to their hand as a punishment for not calling "Uno" prior to ending their turn. Any mistakes in pressing these buttons will include a 4 card penalty to that player.
- If a player who only has one card left and had already called "Uno" on their previous turn is able to play their final card on the board, that player is the winner.

## Wireframe

- **See attached screenshot in the repo for the wireframe*
- HTML site will have Player 1 and Player 2 sections
    - Each player's section will reveal their hand/cards when it is their turn and hide their hand during opposing player's turn
- Sidebar and Game Prompts section will include relevant game info:
    - How many cards is in each player's hand
    - Buttons to start turn, end turn (if needed), game instructions, and two Uno buttons
- Main section for game board
    - The card that is played on the board (discard pile)
    - A button to draw a card (if game play dictates that)
- Section that includes game prompts to reinforce/remind players of the rules and gameplay
- Will need to create an array that includes all the cards that can be picked from (there is a limited number of cards to draw from in the deck).

## Important Features

- Creating a deck of cards with included shuffling of the deck
- Drawing cards from the specific created deck of cards
- Functions:
    - Adding cards to specific players on their turns
    - Dealing cards at the start of the game (or when the start new game button is pressed)
    - Keeping all the cards and how they're displayed on the site consistent
    - Manipulating the display of each player's hands based on whose turn it is
    - Checking to see if cards played match the card that is on the discard pile
    - Accounting for special cards or actions that are played
    - Creating buttons to allow player to select their color when a wild card is discarded
    - Having two Uno buttons and the apporiate checking
    - Checking to see who is the winner 

## Future considerations for building out

- Be able to play with more than 2 players
- Be able to include additional action cards
    - Allow players to establish a new action card and specify new rules
- Allow players to "cut in" by putting down a card that matches identically to what is on the board, even out of turn.
- Having a timer to limit how much time a player gets on their turn, or else it skips their turn.
- Allow the game to played on a shared network, each player would have their own browser; no need to share a single browser among the players.
    - This would improve gameplay experience, allow for more interactivity among players (e,g. cutting in)