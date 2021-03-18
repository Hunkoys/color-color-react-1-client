import { Component } from 'react';
import { getCookie } from '../../common/functions';
import Screen from '../components/Screen';
import Title from '../components/Title';
import Card from '../components/Card';
import Button from '../../generic-components/Button';
import Splash from './Splash';

import AppContext from '../../AppContext';
import Spacer from '../../generic-components/Spacer';
import { server } from '../../common/network';
import GameScreen from './GameScreen';
import Game from '../data/Game';
import Size from '../data/Size';
import LoadingScreen from './LoadingScreen';

function createGame(username, boardSize) {
  const cookie = getCookie();
  const game = Game({});
  game.host.username = cookie.username;
  game.host.playerId = cookie.playerId;
  game.board.size = boardSize;
  return server('create game', game);
}

class CreateBoardButton extends Component {
  render() {
    const size = this.props.size;
    return (
      <AppContext.Consumer>
        {(app) => {
          const [username] = app.usernameHook;
          const [screen, setScreen] = app.screenHook;
          return (
            <Button
              type="block"
              action={() => {
                createGame(username, size).then(() => setScreen(GameScreen));
                setScreen(LoadingScreen);
              }}
            >{`${size.w} x ${size.h}`}</Button>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

function createCube(l) {
  const size = Size({});
  size.w = l;
  size.h = l;
  return size;
}

const boardSizes = {
  small: createCube(7),
  medium: createCube(9),
  large: createCube(11),
};
export default class CreateGameScreen extends Component {
  render() {
    const { small, medium, large } = boardSizes;
    return (
      <AppContext.Consumer>
        {(app) => {
          const [screen, goto] = app.screenHook;

          return (
            <Screen name="CreateBoard">
              <Card>
                <Title>Board Size</Title>
                <CreateBoardButton size={small} />
                <Spacer type="h-gutter" />
                <CreateBoardButton size={medium} />
                <Spacer type="h-gutter" />
                <CreateBoardButton size={large} />
                <Spacer type="back-button-space" />
                <Button type="block" action={() => goto(Splash)}>
                  HOME
                </Button>
              </Card>
            </Screen>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
