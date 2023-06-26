const data = {};

export function setGlobal(key, value) {
  data[key] = value;
}

export function getGlobal(key) {
  return data[key];
}
