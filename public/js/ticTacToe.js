var ticTacToe = {
  numPlayers: 1,
  player: 'X',
  winCombos: [
    [1, 2, 3], // Horizontals
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7], // Verticals
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9], // Diagonals
    [7, 5, 3]
  ],
  playerOneScore: 0,
  playerTwoScore: 0,
  clearBoard: function() {
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
    };
  },

};

function drawBoard() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  //ctx.fillStyle = "#FF0000";
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1;
  // Vertical Lines
  ctx.beginPath();
  ctx.moveTo(133, 0);
  ctx.lineTo(133, 400);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(266, 0);
  ctx.lineTo(266, 400);
  ctx.closePath();
  ctx.stroke();
  // Horizontal Lines
  ctx.beginPath();
  ctx.moveTo(0, 133);
  ctx.lineTo(400, 133);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 266);
  ctx.lineTo(400, 266);
  ctx.closePath();
  ctx.stroke();
};
