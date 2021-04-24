import Board from '../data/Board';

export class Logic {
  constructor(board) {
    this.board = Board(board);
  }

  consume(squares, color, n) {
    return Board();
  }

  getAbsoluteSquare(x, y) {
    const row = this.board[y];
    if (row === undefined) return undefined;

    const square = row[x];
    return square;
  }

  getRelativeSquare(square, x, y) {
    const [xSquare, ySquare] = square;
    const xAbs = xSquare + x;
    const yAbs = ySquare + y;
    return getAbsoluteSquare(xAbs, yAbs);
  }

  top(square) {
    return getRelativeSquare(square, 0, -1);
  }

  bottom(square) {
    return getRelativeSquare(square, 0, 1);
  }

  left(square) {
    return getRelativeSquare(square, -1, 0);
  }

  right(square) {
    return getRelativeSquare(square, 1, 0);
  }
}
