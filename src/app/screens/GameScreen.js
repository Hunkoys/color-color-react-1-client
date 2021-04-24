import { Component } from 'react';
import AppContext from '../../AppContext';
import { faces } from '../../common/classes';
import { getCookie } from '../../common/functions';
import { server, socket } from '../../common/network';
import { pack, unpack } from '../../common/network/packer';
import Button from '../../generic-components/Button';
import Spacer from '../../generic-components/Spacer';
import Card from '../components/Card';
import Screen from '../components/Screen';
import Game from '../data/Game';
import Player from '../data/Player';
import Board from './game-screen/Board';
import ControllerPanel, { action } from './game-screen/ControllerPanel';
import PlayersHud from './game-screen/PlayersHud';
import LoadingScreen from './LoadingScreen';
import Splash from './Splash';

const me = Player(getCookie());

function is(objWithId1, objWithId2) {
  console.log('is', typeof objWithId1.id, typeof objWithId2.id);
  return objWithId1.id === objWithId2.id;
}

export default class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.game;

    socket.connect();
    socket.on('player-joined', (data) => {
      const game = Game(data);
      if (this.props.game.challenger.id === undefined) {
        this.setState({ challenger: game.challenger });
      }
    });
  }

  act = (player, type, data) => {
    if (type === 'confirm') {
      this.setState((game) => {
        const turn = (game.turn && game.turn.id) === (game.host && game.host.id) ? game.challenger : game.host;
        return { turn };
      });
    }
  };

  render() {
    const game = this.state;

    return (
      <AppContext.Consumer>
        {(app) => {
          const [screen, setScreen] = app.screenHook;

          const quitGame = () => {
            server('quit-game').then((success) => {
              if (success) setScreen(<Splash />);
            });
            setScreen(<LoadingScreen />);
          };

          const placement = {
            left: game.host,
            right: game.challenger,
          };
          const turn = is(game.turn, placement.left) ? 'left' : is(game.turn, placement.right) ? 'right' : 'none';

          return (
            <Screen name="GameScreen">
              <Card>
                <Button type="block" action={quitGame}>
                  Quit
                </Button>
                <PlayersHud left={game.host} right={game.challenger} turn={turn} />
                <Spacer type="h-gutter" />
                <Spacer type="h-gutter" />
                <Board colorTable={game.board.table} />
                <Spacer type="h-gutter" />
                <ControllerPanel game={this.state} onAct={this.act} />
                <Spacer type="h-gutter" />
              </Card>
            </Screen>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
