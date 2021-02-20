export default class Accessor {
  constructor(reactComponent, property) {
    this.get = () => reactComponent.state[property];
    this.set = (value) => {
      const state = {};
      state[property] = value;
      reactComponent.setState(state);
    };
  }
}
