import process, { number, string } from '../../common/schema';

export default function Player(assumed) {
  const schema = {
    id: number,
    username: string,
  };

  process(schema, assumed);
  return schema;
}
