import process, { array, number } from '../../common/schema';
import Size from './Size';

export default function Board(assumed) {
  const schema = {
    table: array,
    size: Size(),
    nColors: number,
  };

  process(schema, assumed);
  return schema;
}
