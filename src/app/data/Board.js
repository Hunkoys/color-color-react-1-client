import process from '../../common/schema';
import Size from './Size';

export default function Board(assumed) {
  const schema = {
    size: Size(),
  };

  process(schema, assumed);
  return schema;
}
