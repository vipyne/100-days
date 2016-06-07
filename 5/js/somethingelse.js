;(function(w, d, u) {

  var ticTacToe = function() {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        cWidth = canvas.getAttribute('width'),
        cHeight = canvas.getAttribute('height'),
        markSize = cWidth / 12,
        board = new Array,
        board = [0, 1, 2, 3, 4, 5, 6, 7, 8],
        turn = 'yours',
        gameOver = false;


    var drawBoard = function() {
      context.beginPath();
      context.moveTo(cWidth/3, 0);
      context.lineTo(cWidth/3, cHeight);
      context.moveTo(cWidth/3 * 2, 0);
      context.lineTo(cWidth/3 * 2, cHeight);
      context.moveTo(0, cHeight/3);
      context.lineTo(cWidth, cHeight/3);
      context.moveTo(0, cHeight/3 * 2);
      context.lineTo(cWidth, cHeight/3 * 2);
      context.stroke();
    }

    var drawX = function(coordinates) {
      context.beginPath();
      context.moveTo(coordinates[0] + markSize, coordinates[1] - markSize);
      context.lineTo(coordinates[0] - markSize, coordinates[1] + markSize);
      context.moveTo(coordinates[0] + markSize, coordinates[1] + markSize);
      context.lineTo(coordinates[0] - markSize, coordinates[1] - markSize);
      context.strokeStyle = '#4c01f4';
      context.stroke();
    }

    var drawO = function(coordinates) {
      context.beginPath();
      context.arc(coordinates[0], coordinates[1], markSize, 0, 2 * Math.PI);
      context.strokeStyle = '#e20252';
      context.stroke();
    }

    var play = function() {
      drawBoard();
    }

    var drawWinLine = function(x1, y1, x2, y2) {
      gameOver = true;
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.strokeStyle = '#c0f';
      context.lineWidth = 4;
      context.stroke();
    }

    var evaluateGameStatus = function() {
      if (board[0] === board[1] && board[1] === board[2]) {
        drawWinLine(cWidth / 6, cHeight / 6, cWidth - cWidth / 6, cHeight / 6);
      }
      if (board[3] === board[4] && board[4] === board[5]) {
        drawWinLine(cWidth / 6, cHeight / 2, cWidth - cWidth / 6, cHeight - cHeight / 2);
      }
      if (board[6] === board[7] && board[7] === board[8]) {
        drawWinLine(cWidth / 6, cHeight - cHeight / 6, cWidth - cWidth / 6, cHeight - cHeight / 6);
      }
      if (board[0] === board[3] && board[3] === board[6]) {
        drawWinLine(cWidth / 6, cHeight / 6, cWidth / 6, cHeight - cHeight / 6);
      }
      if (board[1] === board[4] && board[4] === board[7]) {
        drawWinLine(cWidth / 2, cHeight / 6, cWidth / 2, cHeight - cHeight / 6);
      }
      if (board[2] === board[5] && board[5] === board[8]) {
        drawWinLine(cWidth - cWidth / 6, cHeight / 6, cWidth - cWidth / 6, cHeight - cHeight / 6);
      }
      if (board[0] === board[4] && board[4] === board[8]) {
        drawWinLine(cWidth / 6, cHeight / 6, cWidth - cWidth / 6, cHeight - cHeight / 6);
      }
      if (board[2] === board[4] && board[4] === board[6]) {
        drawWinLine(cWidth / 6, cHeight - cHeight / 6, cWidth - cWidth / 6, cHeight / 6);
      }
    }

    document.addEventListener('click', function(event) {
      if (gameOver) { return; }

      var coordinates = [event.clientX, event.clientY],

      leftX   = coordinates[0] < cWidth / 3,
      middleX = coordinates[0] > cWidth / 3 && coordinates[0] < cWidth / 3 * 2,
      rightX  = coordinates[0] > cWidth / 3 * 2,

      topY    = coordinates[1] < cHeight / 3,
      middleY = coordinates[1] > cHeight / 3 && coordinates[1] < cHeight / 3 * 2,
      bottomY = coordinates[1] > cHeight / 3 * 2;

      squareIndex = null;

        if (leftX && topY) {
          if (board[0] === 'played') { return; };
          squareIndex = 0;
        }
        if (middleX && topY) {
          if (board[1] === 'played') { return; };
          squareIndex = 1;
        }
        if (rightX && topY) {
          if (board[2] === 'played') { return; };
          squareIndex = 2;
        }

        if (leftX && middleY) {
          if (board[3] === 'played') { return; };
          squareIndex = 3;
        }
        if (middleX && middleY) {
          if (board[4] === 'played') { return; };
          squareIndex = 4;
        }
        if (rightX && middleY) {
          if (board[5] === 'played') { return; };
          squareIndex = 5;
        }

        if (leftX && bottomY) {
          if (board[6] === 'played') { return; };
          squareIndex = 6;
        }
        if (middleX && bottomY) {
          if (board[7] === 'played') { return; };
          squareIndex = 7;
        }
        if (rightX && bottomY) {
          if (board[8] === 'played') { return; };
          squareIndex = 8;
        }

        if (typeof board[squareIndex] === 'number') {
          if (turn === 'yours') {
            drawX(coordinates);
            board[squareIndex] = 'X';
            turn = 'theirs';
          } else {
            drawO(coordinates);
            board[squareIndex] = 'O';
            turn = 'yours';
          }
        }

        evaluateGameStatus();
    });

    return {
      play : play
    }
  }

  ticTacToe().play();

})(window, document, undefined);