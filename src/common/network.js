import { io } from 'socket.io-client';
import { getCookie } from './functions';
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
  return response;
};

export const server = async (command, data) => {
  const response = await post(`color-color/${command}`, data);
  const packet = await response.json();

  return unpack(packet);
};

// const URL = 'http://dominicvictoria.com';
// const URL = 'http://localhost:2500';
const URL = 'http://192.168.0.189:2500';
export const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log('Socket:', `"${event}"`, ...args);
});

socket.on('whats your id', () => {
  socket.emit('give id', getCookie().id);
});
