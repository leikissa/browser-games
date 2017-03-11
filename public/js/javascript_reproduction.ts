/* TO DO:
  Add functionality to always start with X
  Create one message container?
  Look up "this"
  Check i values for all for loops
*/
// Main App
var ticTacToe = ticTacToe || {
  gameInPlay: false,
  winCombos: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [7, 5, 3]
  ],
  playerOneScore: 0,
  playerTwoScore: 0,
  timeOuts: [],
  clearBoard: function() {
    this.numFilledIn = 0;
    this.currentBoard = {
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: ''
    }
  },
  initializeGame: function() {
    ticTacToe.clearBoard();
    ticTacToe.display.drawBoard();
    $('.game-choice button').click(function() {
      ticTacToe.secondPlayer = ticTacToe.game.gameSelection(this);
      ticTacToe.display.hideGameChoice();
      ticTacToe.display.showGameStarter(ticTacToe.secondPlayer);
      $('.game-starter .choose-x .game-starter .choose-o').off().click(ticTacToe.game.firstGame);
      $('.back-button').on('click', function() {
        ticTacToe.display.hideGameStarter();
        ticTacToe.display.showGameChoice();
      });
    });
    $('.hard-reset').on('click', ticTacToe.game.resetGame);
  }
};

// Display functions
ticTacToe.display = {
  hideGameStarter: function() {
    $('.game-starter').fadeOut();
  },
  showGameStarter: function(isTwoPlayer) {
    var message;
    if (isTwoPlayer) {
      message = "Player 1 : Choose your symbol";
    } else {
      message = "Choose your symbol";
    }
    ticTacToe.timeOuts.push(
      setTimeout(function() {
        $('.game-starter').fadeIn(500).children('p').text(message);
      }, 700)
    );
  },
  showGameChoice: function() {
    $('.game-choice').fadeIn(600);
  },
  hideGameChoice: function() {
    $('.game-choice').fadeOut(600);
  },
  showPlayerOnePrompt: function() {
    if (ticTacToe.secondPlayer) {
      $('.player-one-turn p').text("Player 1's turn!");
    } else {
      $('.player-one-turn p').text("Your turn!");
    }
    $('.player-one-turn').animate({'top': '-45px'}, 500);
  },
  hidePlayerOnePrompt: function() {
    $('.player-one-turn').animate({
      'top': '0'
    }, 500);
  },
  showPlayerTwoPrompt: function() {
    if (ticTacToe.secondPlayer) {
      $('.player-two-turn p').text("Player 2's turn!");
    } else {
      $('.player-two-turn p').text("Computer's turn!");
    }
    $('.player-two-turn').animate({'top': '-45px'}, 500);
  },
  hidePlayerTwoPrompt: function() {
    $('.player-two-turn').animate({
      'top': '0'
    }, 500);
  },
  showDrawMessage: function() {
    ticTacToe.timeOuts.push(
      setTimeout(function() {
        $('.draw-message').fadeIn(500);
      }, 1500)
    );
  },
  hideDrawMessage: function() {
    $('.draw-message').fadeOut(1000);
  },
  showLoseMessage: function() {
    ticTacToe.timeOuts.push(
      setTimeout(function() {
        $('.lose-message').fadeIn(500);
      }, 1500)
    );
  },
  hideLoseMessage: function() {
    $('.lose-message').fadeOut(1000);
  },
  showWinMessage: function() {
    ticTacToe.timeOuts.push(
      setTimeout(function() {
        $('.win-message').fadeIn(500).children('p').text("Player " + ticTacToe.turn + " wins!");
      }, 1500)
    );
  },
  hideWinMessage: function() {
    $('.win-message').fadeOut(1000);
  },

  drawBoard: function() {
    ticTacToe.timeOuts.push(setTimeout(function() {
      var c = document.getElementById("myCanvas");
      var canvas = c.getContext("2d");
      canvas.lineWidth = 1;
      canvas.strokeStyle = "#fff";
      //Vertical
      canvas.beginPath();
      canvas.moveTo(100, 0);
      canvas.lineTo(100, 146.5);
      canvas.closePath();
      canvas.stroke();
      canvas.beginPath();
      canvas.moveTo(200, 0);
      canvas.lineTo(200, 146.5);
      canvas.closePath();
      canvas.stroke();
      //Horizontal
      canvas.beginPath();
      canvas.moveTo(4, 48.5);
      canvas.lineTo(296, 48.5);
      canvas.closePath();
      canvas.stroke();
      canvas.beginPath();
      canvas.moveTo(4, 98.5);
      canvas.lineTo(296, 98.5);
      canvas.closePath();
      canvas.stroke();
    }, 1500));
  },
  resetSquares: function() {
    $('.boxes').html('');
    for (var i = 1; i <= 9; i++) {
      var box = '<li class="' + i + '"><i class="letter"><span></span></i></li>';
      $(box).appendTo($('.boxes'));
    }
  },
  showScore: function() {
    if (ticTacToe.secondPlayer) {
      $('.score-1').children('.name').text('player 1');
      $('.score-2').children('.name').text('player 2');
    } else {
      $('.score-1').children('.name').text('player 1');
      $('.score-2').children('.name').text('computer');
    }

    $('.score-1, .score-2').children('.points').text('0');
    $('.score-1, .score-2, .points-divider').fadeIn();
  },
  updateScore: function(turn) {
    var currentScore = turn === 1 ? ticTacToe.playerOneScore : ticTacToe.playerTwoScore;
    $('.score-' + turn).children('.points').text(currentScore);
  }

};

// Game Logic

ticTacToe.game = {
  whoStarts: function() {
    var random = Math.floor(Math.random() * 2 + 1);
    return random;
  },
  gameSelection: function(item) {
    if ($(item).text() === 'One') {
      return false;
    } else {
      return true;
    }
  },
  firstGame: function() {
    ticTacToe.playerOneSymbol = $(this).text();
    ticTacToe.playerTwoSymbol = ticTacToe.playerOneSymbol == 'X' ? 'O' : 'X';
    ticTacToe.turn = ticTacToe.game.whoStarts();
    ticTacToe.display.hideGameStarter();
    $('#myCanvas').animate({
      'opacity': '1'
    }, 1200);
    $('.hard-reset').fadeIn(600);
    ticTacToe.display.showScore();
    ticTacToe.display.resetSquares();
    ticTacToe.game.play();
  },
  play: function() {
    ticTacToe.gameInPlay = true;
    $('.boxes li').on('click', function() {
      ticTacToe.game.playerTurn(this);
    });
    ticTacToe.timeOuts.push(
      setTimeout(function() {
        if (ticTacToe.turn === 1) {
          ticTacToe.display.showPlayerOnePrompt();
        } else if (ticTacToe.turn === 2) {
          ticTacToe.display.showPlayerTwoPrompt();
        }
      }, 1500),
      setTimeout(function() {
        if (ticTacToe === 2 && !ticTacToe.secondPlayer) {
          ticTacToe.game.computerPlay();
        }
      }, 1200)
    );
  },
  playerTurn: function(square) {
    var symbol = ticTacToe.turn === 1 ? ticTacToe.playerOneSymbol : ticTacToe.playerTwoSymbol;
    var box = $(square).children('i').children('span');
    if (box.text() === '' && ticTacToe.gameInPlay && (ticTacToe.turn === 1 || (ticTacToe.turn === 2 && ticTacToe.secondPlayer))) {
      box.text(symbol);
      var number = $(square).attr('class');
      ticTacToe.game.updateSquare(number, symbol);
      ticTacToe.game.endTurn(symbol);
    }
  },
  computerPlay: function() {
    var computer = ticTacToe.computer;
    var boxNumber;
    if (computer.computerWhichMove(ticTacToe.game) && ticTacToe.turn === 2) {
      boxNumber = computer.computerWhichMove(ticTacToe.game);
      var currentBox = $('.' + boxNumber).children('i');
      var symbol = ticTacToe.playerTwoSymbol;
      ticTacToe.timeOuts.push(
        setTimeout(function() {
          currentBox.children('span').text(symbol);
          ticTacToe.game.updateSquare(boxNumber, ticTacToe.playerTwoSymbol);
          ticTacToe.game.endTurn(symbol);
        }, 1000)
      );
    }
  },
  endTurn: function(symbol) {
    ticTacToe.numFilledIn++;
      if (ticTacToe.gameInPlay) {
        if (ticTacToe.game.checkWin(symbol)[0]) {
          ticTacToe.game.updateScore(ticTacToe.turn);
          if (ticTacToe.secondPlayer) {
            ticTacToe.display.showWinMessage();
          } else {
            ticTacToe.turn === 1 ? ticTacToe.display.showWinMessage() : ticTacToe.display.showLoseMessage;
          }
          ticTacToe.gameInPlay = false;
          ticTacToe.game.showWinningCombination();
          ticTacToe.display.hidePlayerOnePrompt();
          ticTacToe.display.hidePlayerTwoPrompt();
          ticTacToe.game.reset();
        } else if (ticTacToe.numFilledIn >= 9) {
          ticTacToe.gameInPlay = false;
          ticTacToe.display.hidePlayerTwoPrompt();
          ticTacToe.display.hidePlayerOnePrompt();
          ticTacToe.display.showDrawMessage();
          ticTacToe.turn = ticTacToe.game.whoStarts();
          ticTacToe.game.reset();
        } else {
          if (ticTacToe.turn === 1) {
            ticTacToe.display.hidePlayerOnePrompt();
            ticTacToe.display.showPlayerTwoPrompt();
            ticTacToe.turn = 2;
            // Call computer turn if no second playerTwoSymbol
            if (!ticTacToe.secondPlayer) {
              ticTacToe.game.computerPlayer();
            }
          } else if (ticTacToe.turn === 2) {
            ticTacToe.display.showPlayerOnePrompt();
            ticTacToe.display.hidePlayerTwoPrompt();
            ticTacToe.turn = 1;
          }
        }
      }
  },
  updateSquare: function(number, symbol) {
    ticTacToe.currentBoard[number] = symbol;
  },
  checkWin: function(symbol) {
    var currentBoard = ticTacToe.currentBoard;
    var wins = ticTacToe.winCombos;
    var winningCombo = [];
    var winner = wins.some(function(combination) {
      var winning = true;
      for (var i = 0; i < combination.length; i++) {
        if (currentBoard[combination[i]] !== symbol) {
          winning = false;
        }
      }
      if (winning) {
        winningCombo = combination;
      }
      return winning;
    });
    return [winner, winningCombo];
  },
  showWinningCombination: function() {
    var symbol = ticTacToe.turn === 1 ? ticTacToe.playerOneSymbol : ticTacToe.playerTwoSymbol;
    var combo = ticTacToe.game.checkWin(symbol)[1];
    for (var i = 0; i < combo.length; i++) {
      var currentBox = '.' + combo[i];
      $(currentBox).children('i').addClass('win').children('span').addClass('rotate');
    }
  },
  updateScore: function(turn) {
    turn === 1 ? ticTacToe.playerOneScore += 1 : ticTacToe.playerTwoScore += 1;
    ticTacToe.display.updateScore(turn);
  },
  reset: function() {
    ticTacToe.clearBoard();
    ticTacToe.timeOuts.push(
      setTimeout(function() {
        ticTacToe.display.hideDrawMessage();
        ticTacToe.display.hideLoseMessage();
        ticTacToe.display.hideWinMessage();
        $('.boxes li').fadeOut();
      }, 5000),
      setTimeout(function() {
        ticTacToe.display.resetSquares();
        $('.boxes li').fadeIn();
        ticTacToe.numFilledIn = 0;
      }, 6000),
      setTimeout(function() {
        ticTacToe.gameInPlay = true;
        ticTacToe.game.play();
      }, 6000)
    );
  },
  resetGame: function() {
    $('#myCanvas').css('opacity', '0');
    $('.hard-reset').fadeOut();
    $('.points-divider, .score-1, .score-2').fadeOut();
    ticTacToe.playerOneScore = 0;
    ticTacToe.playerTwoScore = 0;
    ticTacToe.display.resetSquares();
    ticTacToe.clearBoard();
    ticTacToe.gameInPlay = false;
    ticTacToe.playerOneSymbol = null;
    ticTacToe.playerTwoSymbol = null;
    ticTacToe.timeOuts.forEach(function(timer) {
      clearTimeout(timer);
    });
    $('.draw-message, .win-message, .lose-message').hide();
    ticTacToe.display.hidePlayerOnePrompt();
    ticTacToe.display.hidePlayerTwoPrompt();
    ticTacToe.display.showGameChoice();
  }
};

/*
    Computer Move Decisions
*/

ticTacToe.computer = {
  computerWhichMove: function() {
    var move = this.winOrBlockChoice('win')[0];
    if (!move) {
      move = this.winOrBlockChoice('block')[0];
    }
    if (!move) {
      move = this.doubleThreatChoice('win');
    }
    if (!move) {
      move = this.doubleThreatChoice('block');
    }
    if (!move) {
      move = this.firstPlay();
    }
    if (!move) {
      move = this.playCenter();
    }
    if (!move) {
      move = this.emptyCorner();
    }
    if (!move) {
      move = this.emptySide();
    }
    move = (move && ticTacToe.currentBoard[move]) === '' ? move : false;
    return move;
  },
  winOrBlockChoice: function(choiceType, board) {
    var board = board || ticTacToe.currentBoard;
    if (choiceType === 'win') {
      var currentSymbol = ticTacToe.playerTwoSymbol;
      var opponentSymbol = ticTacToe.playerOneSymbol;
    } else if (choiceType === 'block') {
      var currentSymbol = ticTacToe.playerOneSymbol;
      var opponentSymbol = ticTacToe.playerTwoSymbol;
    } else {
      return;
    }
    var moves = [];
    ticTacToe.winCombos.forEach(function(combo) {
      var notFound = [];
      var notPlayer = true;
      for (var i = 0; i < combo.length; i++) {
        if (board[combo[i]] !== currentSymbol) {
          if (board[combo[i]] === opponentSymbol) {
            notPlayer = false;
          } else {
            notFound.push(combo[i]);
          }
        }
      }
      if (notFound.length === 1 && notPlayer) {
        var move = notFound[0];
        moves.push(move);
      }
    });
    return moves;
  },
  doubleThreatChoice: function(choiceType) {
    var board = ticTacToe.currentBoard;
    var move;
    if (choiceType === 'win') {
      var currentSymbol = ticTacToe.playerTwoSymbol;
      var opponentSymbol = ticTacToe.playerOneSymbol;
    } else if (choiceType === 'block') {
      var currentSymbol = ticTacToe.playerOneSymbol;
      var opponentSymbol = ticTacToe.playerTwoSymbol;
    }
    if (board[5] === currentSymbol && ticTacToe.numFilledIn === 3) {
      if ((board[1] === opponentSymbol && board[9] === opponentSymbol) || (board[3] === opponentSymbol && board[7] === opponentSymbol)) {
        move = this.emptySide();
      }
    }
    if (!move && board[5] === opponentSymbol && ticTacToe.numFilledIn === 2) {
      move = this.diagonalSecondAttack();
    }
    if (!move) {
      var testBoard = $.extend({}, board);
      for (var i = 1; i <= 9; i++) {
        testBoard = $.extend({}, board);
        if (testBoard[i] === '') {
          testBoard[i] = currentSymbol;
          if (this.winOrBlockChoice(choiceType, testBoard).length >= 2) {
            move = i;
          }
        }
      }
    }
    return move || false;
  },
  diagonalSecondAttack: function() {
    var board = ticTacToe.currentBoard;
    var comp = ticTacToe.playerTwoSymbol;
    var corners = [1, 3, 7, 9];
    for (var i = 0; i < corners.length; i++) {
      if (board[corners[i]] === comp) {
        return 10 - corners[i];
      }
    }
  },
  firstPlay: function() {
    var board = ticTacToe.currentBoard;
    var corners = [1, 3, 7, 9];
    var move;
    if (ticTacToe.numFilledIn === 1) {
      if (board[5] === ticTacToe.playerOneSymbol) {
        var cornerNum = Math.floor(Math.random() * 4 + 1);
        move = corners[cornerNum];
      } else {
        for (var i = 0; i < corners.length; i++) {
          if (ticTacToe.currentBoard[corners[i]] === ticTacToe.playerOneSymbol) {
            move = 5;
          }
        }
      }
    } else if (ticTacToe.numFilledIn === 0) {
      var cornerNum = Math.floor(Math.random() * corners.length + 1);
      move = corners[cornerNum];
    }
    return move ? move : false;
  },
  playCenter: function() {
    if (ticTacToe.currentBoard[5] === '') {
      return 5;
    }
  },
  emptyCorner: function() {
    var board = ticTacToe.currentBoard;
    var corners = [1, 3, 7, 9];
    var move;
    for (var i = 0; i < corners.length; i++) {
      if (board[corners[i]] === '') {
        move = corners[i];
      }
    }
    return move || false;
  },
  emptySide: function() {
    var sides = [2, 4, 6, 8];
    for (var i = 0; i < sides.length; i++) {
      if (ticTacToe.currentBoard[sides[i]] === '') {
        return sides[i];
      }
    }
    return false;
  }
};

// Load Game
$(document).ready(function() {
  ticTacToe.initializeGame();
});
