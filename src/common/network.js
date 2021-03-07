import { pack, unpack } from './network/packer';

export const get = async (path, options) => {
  const response = await fetch(path);
  if (response.status !== 200) {
    console.error(`Something went wrong in fetching data from the server. Error: ${response.status}`);
    return;
  }

  const packet = await response.json();

  return unpack(packet);
};

export const post = async (path, contents) => {
  const response = await fetch(path, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: pack(contents),
  });
  return response.statusText;
};
