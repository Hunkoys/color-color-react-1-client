import { Component } from 'react';
import { getCookie, setCookie } from './common/functions';
import Splash from './app/screens/Splash';
import AppContext from './AppContext';

import './app.scss';

import CreateGameScreen from './app/screens/CreateGameScreen';
import JoinGameScreen from './app/screens/JoinGameScreen';
import LoadingScreen from './app/screens/LoadingScreen';
import { get, server } from './common/network';
import GameScreen from './app/screens/GameScreen';

const cookie = getCookie();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: GameScreen,
      username: cookie.username,
      table: [],
    };

    this.interface = {};

    server('index').then((game) => {
      const inGame = game !== undefined;
      if (inGame) {
        this.setState({ table: game.board.table, screen: GameScreen });
      } else {
        this.setState({ screen: Splash });
      }
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
    this.interface.tableHook = [
      this.state.table,
      (table) => {
        this.setState({ table });
      },
    ];

    return (
      <AppContext.Provider value={this.interface}>
        <this.state.screen />
      </AppContext.Provider>
    );
  }
}
