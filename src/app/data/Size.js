import process, { number } from '../../common/schema';

export default function Size(assumed) {
  const schema = {
    w: number,
    h: number,
  };

  process(schema, assumed);
  return schema;
}
