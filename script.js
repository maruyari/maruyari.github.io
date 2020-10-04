'use strict';

const EMPTY = null;
var board_curr = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]]; // this stores the current gamee state.
var player_is_x = true; // checks if player who plays first is X 

function initial_state() {
    return [[EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]];
}

var client;
var playerID;
var opponentID;
var room;
var activeGame = false;
var singleplayer = false;
let depth = 3;
// below starts the functions used by the minimax algorithm
// for the 2 player mode, and its communication please refer line 693 onwards.
function play(board) {
//     checks who's turn its to play next
    let count = 0;
    let length = 3;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (board[i][j] === 'x' || board[i][j] === 'o') {
                count = count + 1;
            }
        }

    }
    if (player_is_x) {
        if (count === 9) {
            return "over";
        }

        if (count % 2 === 0) {
            return 'x';

        } else {
            return 'o';
        }
    } else {
        if (count === 9) {
            return "over";
        }

        if (count % 2 === 0) {
            return 'o';

        } else {
            return 'x';
        }
    }


}


function actions(board) {
//     given a given game state, this function returns all the possible valid moves and returns it as a array.
    let action = [];
    let length = 3;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (board[i][j] === EMPTY)
                action.push([i, j]);
        }
    }


    return action
}

function checkAction(board, action) {
//     given a given game state and action, this funtion checks if the action is valid
    let allactions = actions(board);
    let x;
    for (x of allactions) {
        if (x[0] === action[0] && x[1] === action[1]) {
            return true;
        }
    }
    return false;

}

function result(board, action) {
// given a game state and action, this funtion returns the resulting board after performing the action on the board
    if (terminal(board)) {
        return "Game over.";
    } else if (!checkAction(board, action)) {
        return "Invalid action.";
    } else {
        let ResultingBoard = _.cloneDeep(board);
        if (play(board) === 'x') {
            ResultingBoard[action[0]][action[1]] = 'x';
        } else
            ResultingBoard[action[0]][action[1]] = 'o';
        return ResultingBoard;
    }


}


function winner(board) {
//     checks if theres a winner, returns it.
    if ((board[0][0] === 'x' && board[1][1] === 'x' && board[2][2] === 'x') || (
        board[0][2] === 'x' && board[1][1] === 'x' && board[2][0] === 'x') || (
        board[0][0] === 'x' && board[0][1] === 'x' && board[0][2] === 'x') || (
        board[1][0] === 'x' && board[1][1] === 'x' && board[1][2] === 'x') || (
        board[2][0] === 'x' && board[2][1] === 'x' && board[2][2] === 'x') || (
        board[0][0] === 'x' && board[1][0] === 'x' && board[2][0] === 'x') || (
        board[0][1] === 'x' && board[1][1] === 'x' && board[2][1] === 'x') || (
        board[0][2] === 'x' && board[1][2] === 'x' && board[2][2] === 'x')) {
        return 'x';
    } else if ((board[0][0] === 'o' && board[1][1] === 'o' && board[2][2] === 'o') || (
        board[0][2] === 'o' && board[1][1] === 'o' && board[2][0] === 'o') || (
        board[0][0] === 'o' && board[0][1] === 'o' && board[0][2] === 'o') || (
        board[1][0] === 'o' && board[1][1] === 'o' && board[1][2] === 'o') || (
        board[2][0] === 'o' && board[2][1] === 'o' && board[2][2] === 'o') || (
        board[0][0] === 'o' && board[1][0] === 'o' && board[2][0] === 'o') || (
        board[0][1] === 'o' && board[1][1] === 'o' && board[2][1] === 'o') || (
        board[0][2] === 'o' && board[1][2] === 'o' && board[2][2] === 'o')) {
        return 'o';
    } else {
        return null;
    }

}


function terminal(board) {
//     checks if the game is over
    if (winner(board) != null)
        return true;
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (board[i][j] === EMPTY)
                return false;
    return true;
}


function utility(board) {
//     if the winner is X then assigns the game result a value 1, else if its O, then assigns -1, if its a tie, then 0
    if (winner(board) === 'x') {
        return 1;
    }

    if (winner(board) === 'o') {
        return -1;
    } else {
        return 0;
    }


}


/**
 * @return {number}
 */
function MaxValue(board, depth, alpha, beta) {
//     console.log("max");
    if (terminal(board) || depth === 0) {
        return utility(board);
    }
    let v = -737427379378478374; // == -INFINITY

    let action;
    for (action of actions(board)) {
        v = Math.max(v, MinValue(result(board, action), depth - 1, alpha, beta));
        alpha = Math.max(alpha, v);
        if (alpha >= beta) {
            break;
        }

    }
    return v;
}


/**
 * @return {number}
 */
function MinValue(board, depth, alpha, beta) {
//     console.log("min");
    if (terminal(board) || depth === 0)
        return utility(board);
    let v = 737427379378478374; //=== +Infinity
    let action;
    for (action of actions(board)) {
        v = Math.min(v, MaxValue(result(board, action), depth - 1, alpha, beta));
        beta = Math.min(v, beta);
        if (alpha >= beta) {
            break;
        }

    }
    return v;
}


function minimax(board) {
    // console.log("minimax is getting",board);
// returns the optimal move to make by the computer
    let maximum = -9876544282792; //the following numbers are informal representations of infinity, if positive and -infinity if negative
    let minimum = 987736356373;
    let alpha = -2837643415347874;
    let beta = 46876435468435467;
    if (board === initial_state()) {
       
        return [0, 0];  //is board is blank then return default play [0,0]
    }

    let finalaction = null;
    if (play(board) === 'x') {
//         we find the maximum ultity here 
        let action;
        let minval;
        for (action of actions(board)) {
            //console.log("actions", actions(board));
            console.log("resulting board", result(board, action));
            minval = MinValue(result(board, action), depth, alpha, beta);
            //console.log("minival=",minval);
            if (minval > maximum) {
                finalaction = action;
                maximum = minval;
            }
        }

        return finalaction;
    } else if (play(board) === 'o') {
//         we find the minimum utility here
        let action;
        let maxval;
        if (board === initial_state()) {
            return [1, 1];
        }
        for (action of actions(board)) {
            //console.log("actions=0", actions(board));

            console.log("resulting board", result(board, action), action);
            maxval = MaxValue(result(board, action), depth, alpha, beta);
            //console.log("maxival=",maxval);
            if (maxval < minimum) {
                finalaction = action;
                minimum = maxval;
            }
        }

        return finalaction;
    }


}
// the minimax modules end 
// below folows the frontend handling 
(function () {

    function TicTacToe(args) {

        // Settings
        var $game = args.game,
            $scores = args.scores,
            $dialogs = args.dialogs,
            cols = [];

        $game.find('.row').each(function (i) {
            var row = [];
            $(this).find('.col').each(function (j) {
                row.push($(this));
            });
            cols.push(row);
        });

        // VARS
        var rows = [
                [cols[0][0], cols[0][1], cols[0][2]],
                [cols[1][0], cols[1][1], cols[1][2]],
                [cols[2][0], cols[2][1], cols[2][2]], // Hori

                [cols[0][0], cols[1][0], cols[2][0]],
                [cols[0][1], cols[1][1], cols[2][1]],
                [cols[0][2], cols[1][2], cols[2][2]], // Verti

                [cols[0][0], cols[1][1], cols[2][2]],
                [cols[0][2], cols[1][1], cols[2][0]] // Diago
            ],
            chars = {self: 'x', opponent: 'o'},
            scores = {self: 0, ties: 0, opponent: 0},
            turn = "self",
            isOpponent = false;


        /*
        ============================================
          UpdateScores Function.
        ============================================
        */
        function updateScores() {

            $scores.find('.p').find('u').html(scores.self);
            $scores.find('.ties').find('u').html(scores.ties);
            $scores.find('.com').find('u').html(scores.opponent);

        } // end-updateScores

        /*
        ============================================
          getCoords Function.
        ============================================
        */
        function getCoords(target) {

            for (var i = 0; i < cols.length; i++) {
                for (var j = 0; j < cols[i].length; j++) {
                    if (target.context === cols[i][j].context) {
                        return {row: i, col: j};
                    }
                }
            }

        } // end-getCoords

        /*
        ============================================
          AppendChar Function.
        ============================================
        */
        function appendChar(target, char) {

            if (target.hasClass('col') && target.children().length < 1) {
                target.append($(document.createElement('u')).addClass(char));
            }

        } // end-appendChar

        /*
        ============================================
          Blink Function.
        ============================================
        */
        function blink($el) {

            function rmClass() {
                $el.removeClass('blink');
            }

            $el.addClass('blink');
            setTimeout(rmClass, 1000);

        } // end-blink

        /*
        ============================================
          SwitchTurn Function.
        ============================================
        */
        function switchTurn() {

            if (turn === "self") {
                turn = "opponent";
            } else {
                turn = "self";
            }
            isOpponent = !isOpponent;

        } // end-switchTurn

        /*
        ============================================
          Dialogs Function.
        ============================================
        */
        function dialogs(fade, dialog) {

            if (fade === 'out') {
                $dialogs.find('.' + dialog).fadeOut(500, function () {
                    $dialogs.find('.end').find('.msg').html('');
                    if (dialog == 'pick') $dialogs.hide();
                });
            } else {
                $dialogs.show(0, function () {
                    $dialogs.find('.' + dialog).fadeIn(500);
                });
            }

        } // end-dialogs

        /*
        ============================================
          Action Function.
        ============================================
        */
        function action(action) {

            cols.forEach(function (row, i) {
                row.forEach(function (col, i) {

                    if (action === 'replay') {
                        col.children('u').remove();
                    } else if (action === 'tie') {
                        blink(col);
                    }

                });
            });

            if (action === 'replay') {
                $dialogs.find('.end').fadeOut(500);
                if (!singleplayer) {
                    setTimeout(dialogs, 500, 'in', 'pick');
                } else {
                    $dialogs.fadeOut(500);
                }
                switchTurn();
                if (singleplayer && turn === "opponent") {
                    let action = minimax(board_curr);
                    opponent(action[0], action[1]);
                }
            } else if (action === 'win') {
                dialogs('in', 'end');
            } else if (action === 'tie') {
                $dialogs.find('.end').find('.msg').html('Tie');
                dialogs('in', 'end');
            }

        } // end-action

        /*
        ============================================
          Winner Function.
        ============================================
        */
        function checkWinner() {

            function getRow(char) {

                rowsLoop:
                    for (var i = 0; i < rows.length; i++) {
                        for (var j = 0; j < rows[i].length; j++) {
                            if (!rows[i][j].children('u').first().hasClass(char)) {
                                continue rowsLoop;
                            }
                        }
                        return rows[i];
                    }

            } // end-getRow

            var p = getRow(chars.self),
                opp = getRow(chars.opponent);

            if (p) {
                return {
                    name: 'p',
                    row: p
                };
            } else if (opp) {
                return {
                    name: 'opp',
                    row: opp
                };
            }
            return false;

        } // end-checkWin
//         the below two funtions might seem redundant, they were required due to JS's asynchronous nature 
        function win(winner) {
            player_is_x = !player_is_x; //since the game is over the below 2 lines set the inital condditions for the next game
            board_curr = initial_state(); 

            function winAction(row, text) {
                row.forEach(function (col) {
                    blink(col);
                });
                $dialogs.find('.end').find('.msg').html(text);
                action('win');
            } // action

            if (winner.name === 'p') {
                winAction(winner.row, 'You win!!');
                scores.self++;
                depth++; //increases depth of minimax, increasing difficulty
                updateScores();
            } else if (winner.name === 'opp') {
                winAction(winner.row, 'Opponent wins!');
                scores.opponent++;
                depth = Math.max(1, depth - 1);//decreases depth of minimax, decreasing difficulty but ensuring that they dont go below 1.
                updateScores();
            }

        } // end-win

        /*
        ============================================
          Tie Function.
        ============================================
        */
        function checkTie() {

            var emptyFound = false;
            colsLoop:
                for (var i = 0; i < cols.length; i++) {
                    for (var j = 0; j < cols[i].length; j++) {
                        if (!cols[i][j].children('u').length) {
                            emptyFound = true;
                            break colsLoop;
                        }
                    }
                }
            return !emptyFound;


        } // end-checkTie

        function tie() {
            player_is_x = !player_is_x;

            board_curr = initial_state();
            action('tie');
            scores.ties++;
            updateScores();

        } // end-tie
        
        /*
        ============================================
          Opponent Function.
        ============================================
        */
        function opponent(row, col) {

            board_curr[row][col] = chars.opponent;
            appendChar(cols[row][col], chars.opponent);

            if (checkWinner()) {
                var winner = checkWinner();
                win(winner);
                return;
            } else if (checkTie()) {
                tie();
                return;
            }

            isOpponent = false;

        } // end-opponent


        /*
        ============================================
          Player Function.
        ============================================
        */
        function self(target) {

            if (isOpponent || !target.hasClass('col') || target.children('u').length) {
                return;
            }

            var coords = getCoords(target);
            console.log(coords);
            board_curr[coords.row][coords.col] = chars.self;
            appendChar(cols[coords.row][coords.col], chars.self);
            if (!singleplayer) {
//                 is its a 2 player game then the coordinates are broadcasted to the other player 
                var msg = playerID + ':' + coords.row.toString() + ':' + coords.col.toString();
                var message = new Paho.MQTT.Message(msg);
                message.destinationName = 'maruyari_tictactoe/' + room;
                client.send(message);
            }


            if (checkWinner()) {
                let winner = checkWinner();
                win(winner);
                return;
            } else if (checkTie()) {
                tie();
                return;
            }

            isOpponent = true;
//             if the game is against the computer then minimax is called.
            if (singleplayer) {
                let action = minimax(board_curr);
                opponent(action[0], action[1]);

            }

        } // end-self

        /*
        ============================================
          Events Function.
        ============================================
        */
        $game.on('click', function (e) {

            var target = $(e.target);

            self(target);

        });

        $dialogs.find('.pick').find('button').on('click', function (e) {
            //come here
            var target = $(e.target);
            if (target.hasClass('x')) {
                chars.self = 'x';
                chars.opponent = 'o';
                player_is_x = true;
                $scores.find('.p').find('.char').html('X');
                $scores.find('.com').find('.char').html('O');
            } else {
                chars.self = 'o';
                chars.opponent = 'x';
                $scores.find('.p').find('.char').html('O');
                $scores.find('.com').find('.char').html('X');
                player_is_x = false;
            }
            dialogs('out', 'pick');

        });

        $dialogs.find('.end').find('.replay').on('click', function (e) {

            action('replay');

        });

        //MQTT related functions for connecting two players
        $dialogs.find('.creater').find('.create_room').on('click', function (e) {
            room = Math.floor(Math.random() * 1000000000).toString();
            client.subscribe('maruyari_tictactoe/' + room);
            $dialogs.find('.creater').fadeOut(500, function () {
                var waiting = $dialogs.find('.waiting');
                waiting.find('.msg').html(room);
                waiting.fadeIn(500);
            });
            console.log(room);
        });

        $dialogs.find('.creater').find('.join_room').on('click', function (e) {
            $dialogs.find('.creater').fadeOut(500, function () {
                var join = $dialogs.find('.join');
                join.fadeIn(500);
            });
        });

        $dialogs.find('.join ').find('.join_button').on('click', function (e) {
            room = $dialogs.find('.join').find('.room_code').val();
            client.subscribe('maruyari_tictactoe/' + room);
            var message = new Paho.MQTT.Message(playerID);
            message.destinationName = 'maruyari_tictactoe/' + room;
            client.send(message);
            turn = "opponent";
            isOpponent = true;
        });

        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        $dialogs.find('.mode').fadeIn(500);
        $dialogs.find('.mode').find('.single').on('click', function () {
            singleplayer = true;
            $dialogs.find('.mode').fadeOut(500, function () {
                $dialogs.find('.pick').fadeIn(500);
            });

        });

        $dialogs.find('.mode').find('.double').on('click', function () {
            twoplayer();
            $dialogs.find('.loader').show();
            $dialogs.find('.mode').fadeOut(500);

        });

        function twoplayer() {
            //Create a client instance
            playerID = makeid(10);
            client = new Paho.MQTT.Client("test.mosquitto.org", 8081, playerID); //this makes the fconnection to the broker used
            // set callback handlers
            client.onConnectionLost = onConnectionLost;
            client.onMessageArrived = onMessageArrived;

            // connect the client
            client.connect({onSuccess: onConnect,useSSL: true});

        }

        // called when the client connects
        function onConnect() {
            // Once a connection has been made, display the room choices.
            console.log("Connected");
            $dialogs.find('.loader').hide();
            $dialogs.find('.creater').fadeIn(500);
        }

        // called when the client loses its connection
        function onConnectionLost(responseObject) {
            if (responseObject.errorCode !== 0) {
                console.log("onConnectionLost:" + responseObject.errorMessage);
                alert("Connection Lost!");
            }
        }

        // called when a message arrives
        function onMessageArrived(message) {
            console.log("onMessageArrived:" + message.payloadString);
            if (!activeGame) {
                opponentID = message.payloadString;
                if (opponentID == playerID) return;
                activeGame = true;
                var message = new Paho.MQTT.Message(playerID);
                message.destinationName = 'maruyari_tictactoe/' + room;
                client.send(message);
                $dialogs.find('.waiting').fadeOut(500);
                $dialogs.find('.join').fadeOut(500);
                setTimeout(function () {
                    $dialogs.find('.pick').fadeIn(500);
                }, 500);
            } else {
                var msg_array = message.payloadString.split(":");
                if (msg_array[0] == opponentID && msg_array.length === 3) {
                    opponent(msg_array[1], msg_array[2]);
                }
            }
        }

    } // end-TicTacToe

    $(document).ready(function () {
        // DOM
        let $game = $('.game'),
            $scores = $('.scores'),
            $dialogs = $('.dialogs');
        let game = new TicTacToe({

            game: $game,
            scores: $scores,
            dialogs: $dialogs

        });

    });

})();
