export const invalid = ['invalid'];

export const string = 'string';
export const number = 'number';
export const boolean = 'boolean';
export const array = 'array';
export const container = 'container';

const typeCheckers = {};

typeCheckers[string] = (value) => {
  if (value instanceof String || typeof value === 'string') return true;
  else return false;
};

typeCheckers[number] = (value) => {
  if (value instanceof Number || (typeof value === 'number' && !isNaN(value))) return true;
  else return false;
};

typeCheckers[boolean] = (value) => {
  if (value instanceof Boolean || typeof value === 'boolean') return true;
  else return false;
};

typeCheckers[array] = (value) => {
  if (value instanceof Array) return true;
  else return false;
};

typeCheckers[container] = (value) => {
  if (value instanceof Object && !(value instanceof Array) && !(value instanceof Function)) return true;
  else return false;
};

function checkType(value, type) {
  return typeCheckers[type](value);
}

export default checkType;
