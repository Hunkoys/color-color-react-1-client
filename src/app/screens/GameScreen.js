import { Component } from 'react';
import AppContext from '../../AppContext';
import { getCookie } from '../../common/functions';
import { server, socket } from '../../common/network';
import Button from '../../generic-components/Button';
import Spacer from '../../generic-components/Spacer';
import Card from '../components/Card';
import Screen from '../components/Screen';
import Game from '../data/Game';
import Player from '../data/Player';
import logic from '../game/logic';
import Board from './game-screen/Board';
import ControllerPanel, { CONFIRM } from './game-screen/ControllerPanel';
import PlayersHud from './game-screen/PlayersHud';
import LoadingScreen from './LoadingScreen';
import Menu from './Menu';
import OpponentLeft from './OpponentLeft';
import QuitConfirmation from './QuitConfirmation';
import Splash from './Splash';

const HOST = 'host';
const CHALLENGER = 'challenger';
const NONE = 'none';

const TOP = [0, -1];
const RIGHT = [1, 0];
const BOTTOM = [0, 1];
const LEFT = [-1, 0];
const CROSS = [TOP, RIGHT, BOTTOM, LEFT];

function getRole(player, game) {
  if (player.id == game.host.id) return HOST;
  if (player.id == game.challenger.id) return CHALLENGER;
  return NONE;
}

function applyToRole(player, game) {
  const role = getRole(player, game);
  const result = {};
  result[role] = player;
  return result;
}

function is(objWithId1, objWithId2) {
  return objWithId1.id === objWithId2.id;
}

export default class GameScreen extends Component {
  constructor(props) {
    super(props);

    const game = this.props.game;
    const [me, enemy] = is(Player(getCookie()), game.host)
      ? [game.host, game.challenger]
      : [game.challenger, game.host];

    this.state = {
      ...game,
      menuIsOpen: false,
      quitConfirmIsOpen: false,
      opponentLeftIsOpen: enemy.id === undefined && game.waitingForOpponent === false,
    };

    socket.connect();
    socket.on('player-joined', (data) => {
      const game = Game(data);

      if (game.waitingForOpponent) {
        this.setState(game);
      }
    });

    socket.on('enemy-quit', () => {
      this.setState({ opponentLeftIsOpen: true });
    });
  }

  colorize(partialPlayer, color) {
    this.setState((game) => {
      const player = is(partialPlayer, game.host) ? game.host : game.challenger;
      player.color = color;

      const all = player.squares.all;
      all.forEach((square) => {
        logic.setColor(game.board, square, color);
      });
      return { ...game, ...applyToRole(player, game) };
    });
  }

  switchTurn() {
    this.setState((game) => {
      return { turn: logic.switchTurn(game) };
    });
  }

  consume(player, range) {
    this.setState((game) => {
      const [me, enemy] = is(player, game.host) ? [game.host, game.challenger] : [game.challenger, game.host];
      const mySquares = me.squares.all;
      const enemySquares = enemy.squares.all;

      // console.log(`my Squares: `, mySquares);

      function isFree(square) {
        const notIn = (list) => !logic.searchIn(list, square);
        return notIn(mySquares) && notIn(enemySquares);
      }

      function getColor(square, offset) {
        return logic.getColor(game.board, square, offset);
      }

      const pending = [];
      function collectSquare(square) {
        mySquares.push(square);
        pending.push(square);
      }

      const edges = me.squares.edges;

      const newEdges = edges.filter((edge) => {
        let isEdge = false;

        // console.log('edging');

        CROSS.forEach((offset) => {
          // console.log('offseting');

          const side = logic.getRelativeSquare(edge, offset);
          const color = getColor(side);

          if (color === undefined) return;
          if (isFree(side)) {
            // console.log(`is Free: ${side}`);
            const myColor = getColor(edge);
            if (color === myColor) {
              // console.log(`Match! : ${myColor} ${color}`);
              collectSquare(side);
            } else isEdge = true;
          }
        });

        return isEdge;
      });

      pending.forEach((square) => {
        // console.log(`pending: ${square}`);
        const isEdge = CROSS.some((offset) => {
          // console.log(`pending offset: ${offset}`);
          const side = logic.getRelativeSquare(square, offset);
          if (getColor(side) !== undefined && isFree(side)) return true;
          else return false;
        });

        if (isEdge) newEdges.push(square);
      });

      // console.log(newEdges);

      me.squares.edges = newEdges;
      return game;
    });
  }

  updateScore() {
    this.setState(({ host, challenger }) => {
      host.score = host.squares.all.length;
      challenger.score = challenger.squares.all.length;
      return { host, challenger };
    });
  }

  act = (player, action, data) => {
    console.warn('acting');
    if (action === CONFIRM) {
      const [color] = data;

      this.colorize(player, color);
      this.consume(player, 1);
      this.updateScore();
      this.switchTurn();
    }
  };

  render() {
    const game = this.state;

    return (
      <AppContext.Consumer>
        {(app) => {
          const [screen, setScreen] = app.screenHook;

          const openMenu = () => {
            this.setState({ menuIsOpen: true });
          };

          const menuCommand = (command) => {
            if (command === 'back') {
              this.setState({ menuIsOpen: false });
            } else if (command === 'quit') {
              this.setState({ quitConfirmIsOpen: true });
            }
          };

          const quitCommand = (command) => {
            if (command === 'quit') {
              server('quit-game')
                .then((success) => {
                  if (success) {
                    socket.emit('quit');
                    socket.disconnect();
                    setScreen(<Splash />);
                  }
                  // else setScreen(failedScreen)
                })
                .catch((error) => {});
              setScreen(<LoadingScreen />);
            } else if (command === 'cancel') this.setState({ quitConfirmIsOpen: false });
          };

          const overlay = this.state.opponentLeftIsOpen ? (
            <OpponentLeft enemy={Player(getCookie()).id === game.host.id ? game.host : game.challenger} />
          ) : this.state.menuIsOpen ? (
            this.state.quitConfirmIsOpen ? (
              <QuitConfirmation onCommand={quitCommand} />
            ) : (
              <Menu onCommand={menuCommand} />
            )
          ) : undefined;

          console.log(this.enemy);

          const placement = {
            left: game.host,
            right: game.challenger,
          };
          const turn = is(game.turn, placement.left) ? 'left' : is(game.turn, placement.right) ? 'right' : 'none';

          return (
            <Screen name="GameScreen" overlay={overlay}>
              <Card>
                <Button type="block" action={openMenu}>
                  Menu
                </Button>
                <PlayersHud left={game.host} right={game.challenger} turn={turn} />
                <Spacer type="h-gutter" />
                <Spacer type="h-gutter" />
                <Board colorTable={game.board.table} highlight={game.turn} />
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
