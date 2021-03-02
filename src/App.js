import { Component } from 'react';
import { Accessor } from './common/classes';
import Splash from './app/screens/Splash';
import AppContext from './AppContext';

import './app.scss';

import CreateBoard from './app/screens/CreateBoard';
import OpenGames from './app/screens/OpenGames';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: Splash,
      username: document.cookie.replace('name=', ''),
    };

    this.interface = {}; // maybe not necessary here.
  }

  render() {
    this.interface.usernameHook = [
      this.state.username,
      (username) => {
        document.cookie = `name=${username}`;
        this.setState({ username });
      },
    ];
    this.interface.screenHook = [
      this.state.screen,
      (screen) => {
        this.setState({ screen });
      },
    ];

    return (
      <AppContext.Provider value={this.interface}>
        <this.state.screen />
      </AppContext.Provider>
    );
  }
}
