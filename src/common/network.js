import { pack, unpack } from './packer';

export const get = async (path) => {
  const response = await fetch(`api/${path}`);
  if (response.status !== 200) {
    console.error(`Something went wrong in fetching data from the server. Error: ${response.status}`);
    return;
  }

  const packet = await response.json();

  return unpack(packet);
};

export const post = async (path, value) => {
  const response = await fetch(`api/${path}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: pack(value),
  });
  return response;
};
