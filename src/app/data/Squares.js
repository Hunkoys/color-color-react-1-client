import process, { array, number } from '../../common/schema';

export default function Squares(assumed) {
  const schema = {
    all: array,
    edges: array,
  };

  process(schema, assumed);
  return schema;
}
