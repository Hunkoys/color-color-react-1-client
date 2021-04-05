import process, { number, string } from '../../common/schema';

export default function Player(assumed) {
  const schema = {
    id: number,
    username: string,
    face: string,
    color: number,
    score: number,
  };

  process(schema, assumed);
  return schema;
}
