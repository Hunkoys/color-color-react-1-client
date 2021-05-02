import process, { boolean, number, string } from '../../common/schema';
import Squares from './Squares';

export default function Player(assumed) {
  const schema = {
    id: number,
    username: string,
    faceName: string,
    color: number,
    score: number,
    squares: Squares(),
    requestedRematch: boolean,
  };

  process(schema, assumed);
  return schema;
}
