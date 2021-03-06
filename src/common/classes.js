export class Accessor {
  constructor(reactComponent, property) {
    this.get = () => reactComponent.state[property];
    this.set = (value) => {
      const state = {};
      state[property] = value;
      reactComponent.setState(state);
    };
  }
}

export const faces = {
  smile: '๐',
  sad: '๐',
  happy: '๐',
  mad: '๐ก',
  monkey: '๐',
  teary: '๐ฅบ',
  vomit: '๐คฎ',
  cry: '๐ญ',
  cocky: '๐คจ',
  devil: '๐',
  crazy: '๐คช',
  poop: '๐ฉ',
  confused: '๐ต',
  shades: '๐',
  nerd: '๐ค',
};
