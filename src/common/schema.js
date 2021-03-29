import checkType, { string, number, boolean, array, container, invalid } from './schema/types';
export { string, number, boolean, array, container, invalid };

let evaluatedSchema;

function tryParse(value, type) {
  if (type === number) {
    if (checkType(value, string)) value = Number(value);
  }

  return value;
}

function represent(value) {
  if (checkType(value, array)) {
    let arrayRepresentation = '';

    value.forEach((item, index) => {
      if (index) arrayRepresentation += ', ';
      arrayRepresentation += `${represent(item)}`;
    });

    return `[ ${arrayRepresentation} ]`;
  } else if (checkType(value, string)) return `'${value}'`;
  else return value;
}

export default function process(schema, assumed) {
  evaluatedSchema = 'Some Object';
  fill(schema, assumed);
  evaluatedSchema = undefined;
}

function fill(schema, assumed) {
  const assumedExists = assumed !== undefined && assumed !== null;
  if (!assumedExists) return;

  let nothingInCommon = true;

  Object.keys(schema).forEach((key) => {
    nothingInCommon = nothingInCommon && false;

    const valueShouldBeContainer = checkType(schema[key], container);
    const type = valueShouldBeContainer ? container : schema[key];

    const value = tryParse(assumed[key], type);

    const valueIsEmpty = value === undefined || value === null;
    const valueIsValid = checkType(value, type);

    if (valueIsValid || valueIsEmpty) {
      if (valueShouldBeContainer) {
        const proxy = valueIsEmpty ? {} : value;
        fill(schema[key], proxy);
      } else {
        schema[key] = value;
      }
    } else {
      console.error(
        `${evaluatedSchema}.~.${key} = ${represent(value)}; // value expected to be a(n) ${schema[key]}. ${
          nothingInCommon ? 'Invalid Object' : ''
        }`
      );
      schema[key] = invalid;
    }
  });
}
