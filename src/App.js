import { Component } from 'react';
import { deleteCookie, getCookie, setCookie } from './common/functions';
import Splash from './app/screens/Splash';
import AppContext from './AppContext';

import './app.scss';

import CreateGameScreen from './app/screens/CreateGameScreen';
import JoinGameScreen from './app/screens/JoinGameScreen';
import LoadingScreen from './app/screens/LoadingScreen';
import { get, server } from './common/network';
import GameScreen from './app/screens/GameScreen';
import Game from './app/data/Game';
import { faces } from './common/classes';

if (getCookie().faceName === undefined) setCookie({ faceName: Object.keys(faces)[0] });
const cookie = getCookie();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: <LoadingScreen />,
      username: cookie.username,
      faceName: cookie.faceName,
    };

    this.interface = {};

    server('index').then((game) => {
      const inGame = game !== undefined;
      if (inGame) {
        this.setState({ screen: <GameScreen game={Game(game)} /> });
      } else {
        this.setState({ screen: <Splash /> });
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
    this.interface.faceHook = [
      this.state.faceName,
      (faceName) => {
        setCookie({ faceName });
        this.setState({ faceName });
      },
    ];
    this.interface.screenHook = [
      this.state.screen,
      (screen) => {
        this.setState({ screen });
      },
    ];
    this.interface.gameHook = [
      this.state.game,
      (game) => {
        this.setState({ game });
      },
    ];

    return <AppContext.Provider value={this.interface}>{this.state.screen}</AppContext.Provider>;
  }
}
