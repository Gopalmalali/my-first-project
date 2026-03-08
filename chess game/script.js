// =============================
// 1. BOARD REPRESENTATION
// =============================

const initialBoard = [
  ["r","n","b","q","k","b","n","r"],
  ["p","p","p","p","p","p","p","p"],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  ["P","P","P","P","P","P","P","P"],
  ["R","N","B","Q","K","B","N","R"]
];

let board = JSON.parse(JSON.stringify(initialBoard));
let selected = null;
let currentTurn = "white";

// =============================
// 2. PIECE UNICODE MAP
// =============================

const pieces = {
  r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟",
  R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙"
};

// =============================
// 3. RENDER BOARD
// =============================

function renderBoard() {
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add((row + col) % 2 === 0 ? "white" : "black");

      square.dataset.row = row;
      square.dataset.col = col;

      const piece = board[row][col];
      if (piece) {
        square.textContent = pieces[piece];
      }

      square.addEventListener("click", handleClick);
      boardDiv.appendChild(square);
    }
  }
}

// =============================
// 4. CLICK HANDLER
// =============================

function handleClick(e) {
  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);
  const piece = board[row][col];

  if (selected) {
    movePiece(selected.row, selected.col, row, col);
    selected = null;
    renderBoard();
    return;
  }

  if (!piece) return;

  if (isCorrectTurn(piece)) {
    selected = { row, col };
  }
}

// =============================
// 5. MOVE LOGIC
// =============================

function movePiece(fromRow, fromCol, toRow, toCol) {
  const piece = board[fromRow][fromCol];
  const legalMoves = generateMoves(fromRow, fromCol);

  const isLegal = legalMoves.some(
    move => move.row === toRow && move.col === toCol
  );

  if (!isLegal) return;

  board[toRow][toCol] = piece;
  board[fromRow][fromCol] = null;

  switchTurn();
}

// =============================
// 6. MOVE GENERATOR
// =============================

function generateMoves(row, col) {
  const piece = board[row][col];
  const moves = [];

  if (!piece) return moves;

  const isWhite = piece === piece.toUpperCase();

  switch (piece.toLowerCase()) {
    case "p":
      const direction = isWhite ? -1 : 1;
      const nextRow = row + direction;

      if (board[nextRow]?.[col] === null) {
        moves.push({ row: nextRow, col });
      }
      break;

    case "r":
      generateSlidingMoves(row, col, moves, [[1,0],[-1,0],[0,1],[0,-1]]);
      break;

    case "b":
      generateSlidingMoves(row, col, moves, [[1,1],[1,-1],[-1,1],[-1,-1]]);
      break;

    case "q":
      generateSlidingMoves(row, col, moves,
        [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]);
      break;

    case "n":
      const knightMoves = [
        [2,1],[2,-1],[-2,1],[-2,-1],
        [1,2],[1,-2],[-1,2],[-1,-2]
      ];
      knightMoves.forEach(([dr,dc])=>{
        addMove(row+dr, col+dc, moves);
      });
      break;

    case "k":
      for (let dr=-1; dr<=1; dr++) {
        for (let dc=-1; dc<=1; dc++) {
          if (dr!==0 || dc!==0)
            addMove(row+dr, col+dc, moves);
        }
      }
      break;
  }

  return moves;
}

// =============================
// HELPERS
// =============================

function generateSlidingMoves(row, col, moves, directions) {
  directions.forEach(([dr,dc])=>{
    let r=row+dr;
    let c=col+dc;
    while (r>=0 && r<8 && c>=0 && c<8) {
      if (board[r][c] === null) {
        moves.push({row:r,col:c});
      } else {
        if (isOpponent(board[row][col], board[r][c])) {
          moves.push({row:r,col:c});
        }
        break;
      }
      r+=dr;
      c+=dc;
    }
  });
}

function addMove(row, col, moves) {
  if (row<0||row>7||col<0||col>7) return;
  if (board[row][col]===null ||
      isOpponent(board[selected.row][selected.col], board[row][col])) {
    moves.push({row,col});
  }
}

function isOpponent(piece1, piece2) {
  if (!piece2) return false;
  return piece1 === piece1.toUpperCase()
    ? piece2 === piece2.toLowerCase()
    : piece2 === piece2.toUpperCase();
}

function isCorrectTurn(piece) {
  return currentTurn === "white"
    ? piece === piece.toUpperCase()
    : piece === piece.toLowerCase();
}

function switchTurn() {
  currentTurn = currentTurn === "white" ? "black" : "white";
}

// =============================
// START GAME
// =============================

renderBoard();