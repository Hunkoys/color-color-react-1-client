import process, { array } from '../../common/schema';
import Size from './Size';

export default function Board(assumed) {
  const schema = {
    table: array,
    size: Size(),
  };

  process(schema, assumed);
  return schema;
}
