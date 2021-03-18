import process, { array } from '../../common/schema';
import Size from './Size';

export default function Board(assumed) {
  const schema = {
    colorArray: array,
    size: Size(),
  };

  process(schema, assumed);
  return schema;
}
