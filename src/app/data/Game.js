import process, { boolean, number } from '../../common/schema';
import Board from './Board';
import Player from './Player';

export default function Game(assumed) {
  const schema = {
    id: number,
    host: Player(),
    challenger: Player(),
    board: Board(),
    turn: Player(),
    waitingForOpponent: boolean,
    gameOver: boolean,
  };

  process(schema, assumed);
  return schema;
}
