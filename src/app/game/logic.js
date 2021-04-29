import Board from '../data/Board';

const TOP = [0, -1];
const BOTTOM = [0, 1];
const LEFT = [-1, 0];
const RIGHT = [1, 0];

function sameCoords(coord1, coord2) {
  const [x1, y1] = coord1;
  const [x2, y2] = coord2;
  return x1 === x2 && y1 === y2;
}
export class BoardManager {
  constructor(board) {
    this.board = Board(board);
  }

  consume(squares, color, n) {
    return Board();
  }

  getValue(coords, offset = [0, 0]) {
    const [xOrigin, yOrigin] = coords;
    const [xOffset, yOffset] = offset;

    const [x, y] = [xOrigin + xOffset, yOrigin + yOffset];

    const table = this.board.table;

    const row = table[y];
    if (row === undefined) return undefined;
    const square = row[x];
    return square;
  }

  top(square) {
    return this.getValue(square, TOP);
  }

  bottom(square) {
    return this.getValue(square, BOTTOM);
  }

  left(square) {
    return this.getValue(square, LEFT);
  }

  right(square) {
    return this.getValue(square, RIGHT);
  }
}

export default {
  switchTurn(game) {
    return (game.turn && game.turn.id) === (game.host && game.host.id) ? game.challenger : game.host;
  },

  searchIn(list, square) {
    return list.some((squareInList) => {
      const [xSIL, ySIL] = squareInList;
      const [x, y] = square;

      return x === xSIL && y === ySIL;

      // return square[0] === squareInList[0] && square[1] === squareInList[1];
    });
  },

  getColor(board, coords, offset = [0, 0]) {
    const [xOrigin, yOrigin] = coords;
    const [xOffset, yOffset] = offset;

    const [x, y] = [xOrigin + xOffset, yOrigin + yOffset];

    const table = board.table;

    const row = table[y];
    if (row === undefined) return undefined;
    const color = row[x];
    return color;
  },

  setColor(board, coords, color) {
    const [x, y] = coords;

    const table = board.table;

    const row = table[y];
    if (row === undefined) return undefined;
    row[x] = color;
  },

  getRelativeSquare(coords, offset) {
    const [xOrigin, yOrigin] = coords;
    const [xOffset, yOffset] = offset;

    return [xOrigin + xOffset, yOrigin + yOffset];
  },
};
