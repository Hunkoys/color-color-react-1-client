import { Component } from 'react';
import AppContext from '../../AppContext';
import { get } from '../../common/network';
import Button from '../../generic-components/Button';
import Spacer from '../../generic-components/Spacer';
import Card from '../components/Card';
import Screen from '../components/Screen';
import Board from './game-screen/Board';
import ColorPanel from './game-screen/ColorPanel';
import Splash from './Splash';

export default class GameScreen extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {(app) => {
          const [screen, setScreen] = app.screenHook;
          const [game] = app.gameHook;
          return (
            <Screen name="Game">
              <Card>
                <ColorPanel nColors={8} />
                <Spacer type="h-gutter" />
                <Board data={game.board} />
                <Spacer type="h-gutter" />
                <ColorPanel
                  nColors={6}
                  onChange={(i) => console.log(i)}
                  onConfirm={(i) => {
                    console.log('confirm', i);
                  }}
                  disabled={[2, 3]}
                />
                <Spacer type="h-gutter" />
              </Card>
            </Screen>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
