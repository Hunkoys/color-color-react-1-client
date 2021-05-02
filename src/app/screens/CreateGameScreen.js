import { Component } from 'react';
import Screen from '../components/Screen';
import Title from '../components/Title';
import Card from '../components/Card';
import Button from '../../generic-components/Button';
import Splash from './Splash';

import AppContext from '../../AppContext';
import Spacer from '../../generic-components/Spacer';
import { server } from '../../common/network';
import GameScreen from './GameScreen';
import Size from '../data/Size';
import LoadingScreen from './LoadingScreen';
import Game from '../data/Game';
import ReturnToGameScreen from './ReturnToGameScreen';

class CreateBoardButton extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {(app) => {
          const size = this.props.size;
          const [screen, setScreen] = app.screenHook;
          return (
            <Button
              type="block"
              action={() => {
                const config = { board: { size, nColors: 8 } };
                server('create-game', config).then((response) => {
                  if (response) {
                    const game = Game(response);

                    setScreen(<GameScreen game={game} />);
                  } else {
                    setScreen(<ReturnToGameScreen />);
                  }
                });

                setScreen(<LoadingScreen />);
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
  // small: createCube(3),
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
          const [screen, setScreen] = app.screenHook;

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
                <Button type="block" action={() => setScreen(<Splash />)}>
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
