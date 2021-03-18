import { Component } from 'react';
import { getCookie, setCookie } from './common/functions';
import Splash from './app/screens/Splash';
import AppContext from './AppContext';

import './app.scss';

import CreateGameScreen from './app/screens/CreateGameScreen';
import JoinGameScreen from './app/screens/JoinGameScreen';
import LoadingScreen from './app/screens/LoadingScreen';
import { get, server } from './common/network';
import Game from './app/screens/GameScreen';

const cookie = getCookie();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: LoadingScreen,
      username: cookie.username,
    };

    this.interface = {}; // maybe not necessary here.

    server('index').then(({ inGame, id }) => {
      const screen = inGame ? Game : Splash;
      this.setState({ screen });

      if (id) setCookie({ id });
    });
  }

  render() {
    this.interface.usernameHook = [
      this.state.username,
      (username) => {
        setCookie({ username });
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
