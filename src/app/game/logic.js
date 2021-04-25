import Board from '../data/Board';

class BoardManager {
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
    return this.getAbsoluteSquare(xAbs, yAbs);
  }

  top(square) {
    return this.getRelativeSquare(square, 0, -1);
  }

  bottom(square) {
    return this.getRelativeSquare(square, 0, 1);
  }

  left(square) {
    return this.getRelativeSquare(square, -1, 0);
  }

  right(square) {
    return this.getRelativeSquare(square, 1, 0);
  }
}

export default {
  switchTurn(game) {
    return (game.turn && game.turn.id) === (game.host && game.host.id) ? game.challenger : game.host;
  },

  consume(player, board, range) {
    return board;
  },
};
