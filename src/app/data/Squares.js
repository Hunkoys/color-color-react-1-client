import process, { array, number } from '../../common/schema';

export default function Squares(assumed) {
  const schema = {
    all: array,
    edges: array,
    color: number,
  };

  process(schema, assumed);
  return schema;
}
