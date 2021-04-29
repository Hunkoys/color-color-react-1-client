import process, { number } from '../../common/schema';
import Board from './Board';
import Player from './Player';

export default function Game(assumed) {
  const schema = {
    id: number,
    host: Player(),
    challenger: Player(),
    board: Board(),
    turn: Player(),
  };

  process(schema, assumed);
  return schema;
}
