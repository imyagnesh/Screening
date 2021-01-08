

const createBoard = (boardSize) =>
[...Array(boardSize)].map((v) => [...Array(boardSize)].map((v) => false));

const copyBoard = (board) => board.map((column) => column.slice());

const entireBoardVisited = (board) =>
board.every((column) => column.every((square) => square));

const possibleMoves = (x, y, board, size) => {
const moves = [];

const possibilities = [
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
];
for (let [offsetX, offsetY] of possibilities) {
  const newX = x + offsetX;
  const newY = y + offsetY;
  if (
    newX < size &&
    newX >= 0 &&
    newY < size &&
    newY >= 0 &&
    !board[newX][newY]
  ) {
    moves.push([newX, newY]);
  }
}
return moves;
}

const visitNext = (x, y, board, boardSize) => {
const copiedBoard = copyBoard(board);
copiedBoard[x][y] = true;

let moves = possibleMoves(x, y, copiedBoard, boardSize);
if (moves.length === 0) {
  if (entireBoardVisited(copiedBoard)) return [[x, y]];
  return false;
}

moves = warnsdorff(moves, copiedBoard, boardSize);

for (let [nextX, nextY] of moves) {
  let path = visitNext(nextX, nextY, copiedBoard, boardSize);
  if (!!path) {
    path.push([x, y]);
    return path;
  }
}
return false;
}

const warnsdorff = (moves, board, size) => {
const weightedMoves = [];
for (const [x, y] of moves) {
  const weight = possibleMoves(x, y, board, size).length;
  weightedMoves.push({ move: [x, y], weight });
}
return weightedMoves
  .sort((a, b) => a.weight - b.weight)
  .map((weighted) => weighted.move);
}

const travelingKnight = (x, y, boardSize) => {
const board = createBoard(boardSize);
if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
  return visitNext(x, y, board, boardSize).reverse();
}
return [];
}

console.log(travelingKnight(4, 4, 5));
