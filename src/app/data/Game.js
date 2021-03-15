import process, { string } from '../../common/schema';
import Board from './Board';

export default function Game(assumed) {
  const schema = {
    host: string,
    challenger: string,
    board: Board(),
  };

  process(schema, assumed);
  return schema;
}
