import { Component } from 'react';
import { Accessor } from './standard/standard';
import Splash from './app/Splash';
import AppContext from './AppContext';

import './BaseComponents.scss';
import './App.scss';

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
