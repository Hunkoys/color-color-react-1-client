import { Component } from 'react';
import Splash from './app/Splash';
import AppContext from './AppContext';

class Accessor {
  constructor(reactComponent, property) {
    this.get = () => reactComponent.state[property];
    this.set = (value) => {
      const state = {};
      state[property] = value;
      reactComponent.setState(state);
    };
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: Splash,
      username: 'Dominic Victoria',
    };

    this.appInterface = {
      state: this.state,
      goto: (screen) => {
        this.setState({ screen });
      },
      username: new Accessor(this, 'username'),
    };
  }

  render() {
    console.log(this.state.username);
    return (
      <AppContext.Provider value={this.appInterface}>
        <this.state.screen />
      </AppContext.Provider>
    );
  }
}
