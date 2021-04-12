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
  smile: '😀',
  sad: '😞',
  happy: '😊',
  mad: '😡',
  monkey: '🙉',
  teary: '🥺',
  vomit: '🤮',
  cry: '😭',
  cocky: '🤨',
  devil: '😈',
  crazy: '🤪',
  poop: '💩',
  confused: '😵',
  shades: '😎',
  nerd: '🤓',
};
