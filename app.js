const squares = document.querySelectorAll('.square');
const board = document.querySelector('.board');
const winner = document.querySelector('#winner');
const newGameButton = document.querySelector('#newGameButton');
const gameState = {
  isX: true,
  gameBoard: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
};
const makeNewBoard = () => {
  const board = [];
  for (let i = 0; i < 3; i++) {
    board.push([]);
    for (let j = 0; j < 3; j++) {
      board[i].push(null);
    }
  }
  gameState.gameBoard = board;
};

const winRowCheck = (row) => {
  if (gameState.isX) {
    return row.every((square) => square === 'x');
  } else {
    return row.every((square) => square === 'o');
  }
};

const winColCheck = (board, col) => {
  const column = board.map((row) => row[col]);
  return winRowCheck(column);
};

const winDiagCheck = (board) => {
  const dia1 = [board[0][0], board[1][1], board[2][2]];
  const dia2 = [board[0][2], board[1][1], board[2][0]];
  let res1 = winRowCheck(dia1);
  let res2 = winRowCheck(dia2);
  return res1 || res2;
};

const isWinningBoard = (board, row, col) => {
  if (winRowCheck(board[row])) {
    console.log('winnder');
    return true;
  }
  if (winColCheck(board, col)) {
    return true;
  }
  if (winDiagCheck(board)) {
    return true;
  }
  return false;
};

const isValidMove = (row, col) => {
  return gameState.gameBoard[row][col] === null;
};

const placePiece = (board, row, col, id) => {
  if (gameState.isX) {
    board[row][col] = 'x';
  } else {
    board[row][col] = 'o';
  }
  document.getElementById(id).innerHTML = gameState.isX ? 'X' : 'O';
};

const declareWinner = () => {
  winner.innerHTML = `${gameState.isX ? 'X' : 'O'} is the Winner!!!`;
  setTimeout(() => {
    winner.innerHTML = '';
  }, 3000);
};

board.addEventListener('click', (e) => {
  e.stopPropagation();
  let current = e.target;

  if (current.classList && current.classList.contains('square')) {
    const [col, row] = current.id.split('-');

    if (!isValidMove(row, col)) {
      return;
    } else {
      placePiece(gameState.gameBoard, row, col, current.id);

      if (isWinningBoard(gameState.gameBoard, row, col)) {
        declareWinner();
      } else {
        gameState.isX = !gameState.isX;
      }
    }
  }
});

newGameButton.addEventListener('click', () => {
  makeNewBoard();
  squares.forEach((square) => (square.innerHTML = ''));
});
