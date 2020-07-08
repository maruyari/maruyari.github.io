'use strict';
//static import _ from "lodash"
var EMPTY= null;

function initial_state() {
  return [[EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]];
}


function player(board) {
  let count = 0;
  length = board.length;
  for (let i=0;i<length;i++){
    for (let j=0;j<length;j++)
    {
      if (board[i][j] ==="X" || board[i][j] === "O"){
        count = count + 1;
      }
    }

  }

  if (count === 9)
  {
    return "over";
  }

  if (count % 2 === 0){
    return "O";

  }
  else{
    return "X";
  }

}


function actions(board) {
  let action = [];
  length = board.length;
  for (let i=0;i<length;i++){
    for (let j=0;j<length;j++)
    {
      if (board[i][j] === EMPTY)
        action.push([i,j]);
    }
  }


  return action
}
function checkAction(board,action) {
  let allactions=actions(board);
  let x;
  for(x of allactions){
    if(x===action){
      return true;
    }
  }
  return false;

}

function result(board, action) {
  let ResultingBoard=_.cloneDeep(board);
  if (terminal(board))
  {
    return "Game over.";
  }

  else if (!checkAction(board,action))
  {
    return "Invalid action.";
  }

  else
  {
    if (player(board) === "X")
    {
      ResultingBoard[action[0]][action[1]] = "X";
    }

    else
      ResultingBoard[action[0]][action[1]] = "O";
  }



  return ResultingBoard;
}


function winner(board) {
  if ((board[0][0] === "X" && board[1][1] === "X" && board[2][2] ==="X") || (
      board[0][2] === "X" && board[1][1] === "X" && board[2][0] === "X") || (
      board[0][0] === "X" && board[0][1] === "X" && board[0][2] === "X") || (
      board[1][0] === "X" && board[1][1] ==="X" && board[1][2] === "X") || (
      board[2][0] === "X" && board[2][1] === "X" && board[2][2] === "X") || (
      board[0][0] ==="X" && board[1][0] === "X" && board[2][0] === "X") || (
      board[0][1] === "X" && board[1][1] === "X" && board[2][1] === "X") || (
      board[0][2] === "X" && board[1][2] === "X" && board[2][2] === "X"))
  {
    return "X";
  }

  else if ((board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") || (
      board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O") || (
      board[0][0] ==="O" && board[0][1] === "O" && board[0][2] === "O") || (
      board[1][0] ==="O" && board[1][1] === "O" && board[1][2] === "O") || (
      board[2][0] === "O" && board[2][1] === "O" && board[2][2] === "O") || (
      board[0][0] === "O" && board[1][0] === "O" && board[2][0] === "O") || (
      board[0][1] === "O" && board[1][1] === "O" && board[2][1] === "O") || (
      board[0][2] === "O" && board[1][2] === "O" && board[2][2] === "O"))
  {
    return "O";
  }

  else
  {
    return null;
  }

}


function terminal(board){
  if (winner(board)!= null)
    return true;
  for (let row of board)
    for (let cell of row)
      if (cell === EMPTY)
        return false;
  return true;
}


function utility(board) {
  if (winner(board) === "X")
  {
    return 1;
  }
  if (winner(board) === "O")
  {
    return -1;
  }
  else
  {
    return 0;
  }


}


/**
 * @return {number}
 */
function MaxValue(board) {
  if (terminal(board))
  {
    return utility(board);
  }
  let v = -737427379378478374;

  let action;
  for (action of actions(board))
  {
    v = Math.max(v, MinValue(result(board, action)));
    alpha= Math.max(alpha, v);
    if (beta <= alpha)
      break;
  }

  return v;
}


/**
 * @return {number}
 */
function MinValue(board) {
  if (terminal(board))
    return utility(board);
  let v = 737427379378478374;
  let action;
  for (action of actions(board))
  {
    v = Math.max(v, MinValue(result(board, action)));
    beta = Math.min(beta, v);
    if (beta <= alpha)
      break;
  }


  return v;
}
var alpha = -737427379378478374;
var beta = 737427379378478374;

function minimax(board) {

  let maximum = -9876544282792;
  let minimum = 987736356373;


  if (board === initial_state())
  {
    return [0, 0];
  }

  let finalaction = null;
  if (player(board) === "X")
  {   let action;
    let minval;
    for ( action of actions(board))
    {
      minval = MinValue(result(board, action));
      if (minval > maximum)
      {
        finalaction = action;
        maximum = minval;
      }
    }


    return finalaction;
  }


  else if(player(board) === "O")
  {   let action;
    let maxval;
    for (action of actions(board))
    {
      maxval = MaxValue(result(board, action));
      if (maxval < minimum)
      {
        finalaction = action;
        minimum = maxval;
      }
    }


  }


  return finalaction;
}
(function() {

  function TicTacToe(args) {

    // Settings
    var $game = args.game,
        $scores = args.scores,
        $dialogs = args.dialogs,
        cols = [];

    $game.find('.row').each(function(i) {
      var row = [];
      $(this).find('.col').each(function(j) {
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
        chars = { p: 'x', com: 'o' },
        scores = {  p: 0, ties: 0, com: 0 },
        turn = 'p',
        isComputer = false;

    /*
    ============================================
      UpdateScores Function.
    ============================================
    */
    function updateScores() {

      $scores.find('.p').find('u').html(scores.p);
      $scores.find('.ties').find('u').html(scores.ties);
      $scores.find('.com').find('u').html(scores.com);

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
            return { row: i, col: j };
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
      setTimeout(rmClass, 2000);

    } // end-blink

    /*
    ============================================
      SwitchTurn Function.
    ============================================
    */
    function switchTurn() {

      if (turn === 'p') {
        turn = 'com';
      } else {
        turn = 'p';
      }

    } // end-switchTurn

    /*
    ============================================
      Dialogs Function.
    ============================================
    */
    function dialogs(fade, dialog) {

      if (fade === 'out') {
        $dialogs.fadeOut(500, function() {
          $dialogs.find('.end').find('.msg').html('');
        });
      } else {
        $dialogs.children().show();
        $dialogs.find('.' + dialog).hide(0, function() {
          $dialogs.fadeIn(500);
        });
      }

    } // end-dialogs

    /*
    ============================================
      Action Function.
    ============================================
    */
    function action(action) {

      cols.forEach(function(row, i) {
        row.forEach(function(col, i) {

          if (action === 'replay') {
            col.children('u').remove();
          } else if (action === 'tie') {
            blink(col);
          }

        });
      });

      if (action === 'replay') {
        dialogs('out', 'pick');
        switchTurn();
        if (turn === 'com') {
          setTimeout(computer, 500);
        }
      } else if (action === 'win') {
        dialogs('in', 'pick');
      } else if (action === 'tie') {
        $dialogs.find('.msg').html('Tie');
        dialogs('in', 'pick');
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

      var p = getRow(chars.p),
          com = getRow(chars.com);

      if (p) {
        return {
          name: 'p',
          row: p
        };
      } else if (com) {
        return {
          name: 'com',
          row: com
        };
      }
      return false;

    } // end-checkWin

    function win(winner) {

      function winAction(row, text) {
        row.forEach(function(col) {
          blink(col);
        });
        $dialogs.find('.msg').html(text);
        action('win');
      } // action

      if (winner.name === 'p') {
        winAction(winner.row, 'You win!!');
        scores.p++;
        updateScores();
      } else if (winner.name === 'com') {
        winAction(winner.row, 'Computer wins!');
        scores.com++;
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
      if (emptyFound) {
        return false;
      }
      return true;

    } // end-checkTie

    function tie() {

      action('tie');
      scores.ties++;
      updateScores();

    } // end-tie

    /*
    ============================================
      Computer Function.
    ============================================
    */
    function computer() {

      if (checkWinner()) {
        isComputer = false;
        var winner = checkWinner();
        win(winner);
        return;
      } else if (checkTie()) {
        isComputer = false;
        tie();
        return;
      }

      isComputer = true;

      let board=[];
      for (let i=0 ;i<3 ;i++)
      {
        for (let j=0;j<3;j++)
        {
          board[i][j]=cols[i][j];
        }

      }

      let action= minimax(board);
      let i=action[0];
      let j=action[1];
      appendChar(cols[i][j], chars.com); //give the move in form of col[i][j]

      isComputer = false;

      if (checkWinner()) {
        var winner = checkWinner();
        win(winner);
        return;
      } else if (checkTie()) {
        tie();
        return;
      }

    } // end-computer


    /*
    ============================================
      Player Function.
    ============================================
    */
    function player(target) {

      if (isComputer || !target.hasClass('col') || target.children('u').length) {
        return;
      }

      var coords = getCoords(target);

      appendChar(cols[coords.row][coords.col], chars.p);

      if (checkWinner()) {
        var winner = checkWinner();
        win(winner);
        return;
      } else if (checkTie()) {
        tie();
        return;
      }

      isComputer = true;
      setTimeout(computer, 250);

    } // end-player

    /*
    ============================================
      Events Function.
    ============================================
    */
    $game.on('click', function(e) {

      var target = $(e.target);

      player(target);

    });

    $dialogs.find('.pick').find('button').on('click', function(e) {

      var target = $(e.target);
      if (target.hasClass('x')) {
        chars.p = 'x';
        chars.com = 'o';
        $scores.find('.p').find('.char').html('X');
        $scores.find('.com').find('.char').html('O');
      } else {
        chars.p = 'o';
        chars.com = 'x';
        $scores.find('.p').find('.char').html('O');
        $scores.find('.com').find('.char').html('X');
      }
      dialogs('out', 'pick');

    });

    $dialogs.find('.end').find('.replay').on('click', function(e) {

      action('replay');

    });

  } // end-TicTacToe

  $(document).ready(function() {

    // DOM
    var $game = $('.game'),
        $scores = $('.scores'),
        $dialogs = $('.dialogs');

    var game = new TicTacToe({

      game: $game,
      scores: $scores,
      dialogs: $dialogs

    });

  });

})()
