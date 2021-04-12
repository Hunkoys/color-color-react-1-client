export const pack = (contents) => {
  return JSON.stringify({ contents });
};

export const unpack = (packet) => {
  if (packet == undefined) return packet;
  const transcribed = typeof packet === 'string' ? JSON.parse(packet) : packet;
  const content = transcribed.contents;
  return content;
};
