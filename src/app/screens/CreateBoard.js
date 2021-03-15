import { Component } from 'react';
import Screen from '../components/Screen';
import Title from '../components/Title';
import Card from '../components/Card';
import Button from '../../generic-components/Button';
import Splash from './Splash';

import AppContext from '../../AppContext';
import Spacer from '../../generic-components/Spacer';
import { post, get } from '../../common/network';
import Game from '../data/Game';

function createGame(username, boardSize) {
  post('api/create-game', {
    host: username,
    boardSize,
  });
}

class CreateBoardButton extends Component {
  render() {
    const game = Game({
      challenger: 'dogo',
      host: 'nick',
    });

    post('bro', game);
    get('bro')
      .then((data) => {
        const game = Game(data);
        game.board.size.w = 23;
        return post('bro', game);
      })
      .then(() => get('bro'))
      .then((data) => {
        const game = Game(data);
        console.table(game);
      });
    console.table(game);
    const size = this.props.size;
    return (
      <AppContext.Consumer>
        {(app) => {
          const [username] = app.usernameHook;
          return <Button type="block" action={() => createGame(username, size)}>{`${size.w} x ${size.h}`}</Button>;
        }}
      </AppContext.Consumer>
    );
  }
}

const boardSizes = {
  small: {
    w: 7,
    h: 7,
  },
  medium: {
    w: 11,
    h: 11,
  },
  large: {
    w: 15,
    h: 15,
  },
};
export default class CreateBoard extends Component {
  render() {
    const { small, medium, large } = boardSizes;
    return (
      <AppContext.Consumer>
        {(app) => {
          const [screen, goto] = app.screenHook;

          return (
            <Screen type={'CreateBoard'}>
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
