
## Tic Tac toe game - Web application
 Hosted on http://maruyari.github.io
 
> - __Completely coded using client side scripting, does not require a API, or backend framework__
> - __Languages used:_HTML as a markup, Javascript (along with JQuery library), and CSS for styling_.__
   
 __Warning: Refreshing web page will start a new game__
 ## Supports 2 modes of play
 1. Play against Computer -(one player)
 2. Play against friend online -(two player)
 _Both the options implemented using the same HTML, and javascript file_, thus decreasing size of total application.
 ## Features
 1. Keeps score of player and opponent as well as tie games.
 2. Has a Spotify playlist widget on the right panel which is dynamic, i.e changes regularly and the player can choose to listen to music while playing(feature not available on mobile)
 3. First move alternates between player and opponent.
 4. Player can choose X, O.
 # Description of each mode:
 
 ## Play against computer (play against AI)
 1. Here your opponent is the AI alogorithm which will play against you.
 2. The algorithm used is the minimax algorithm, optimised with alpha beta pruning.
 3. difficulty is auto-adjusted. 
    1. Adjusted using depth of minimax algorithm
    2. Depth is increased if player wins, thus increasing difficulty
    3. Depth is decreased by 1 if player loses, thus decreases difficulty.
    4. Base difficulty starts at 3.
 4. Alpha beta pruning incorporated - increases the decision making speed of the AI by 6 times
 
 ## Play against Friend 
 1. Gives you option to create room and join room.
 2. Both you and your friend can choose the same symbol X or O in your page but response from the other side will always be complimentary.
 3. MQTT protocol is used for communication. 
 4. Destination name on server is `'maruyari_tictactoe/' + room ` where room is room code
 5. MQTT is used because the payload that has to be broadcasted is very small and, its use is very efficient as it doesnt have the overhead of HTTP.
 6. Person who creates room has to start the game.
 
 
