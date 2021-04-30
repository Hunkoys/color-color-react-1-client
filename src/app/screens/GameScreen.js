import { Component } from 'react';
import AppContext from '../../AppContext';
import { server, socket } from '../../common/network';
import Button from '../../generic-components/Button';
import Spacer from '../../generic-components/Spacer';
import Card from '../components/Card';
import Screen from '../components/Screen';
import Game from '../data/Game';
import logic, { BoardManager } from '../game/logic';
import Board from './game-screen/Board';
import ControllerPanel, { CONFIRM } from './game-screen/ControllerPanel';
import PlayersHud from './game-screen/PlayersHud';
import LoadingScreen from './LoadingScreen';
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
    this.state = this.props.game;

    socket.connect();
    socket.on('player-joined', (data) => {
      const game = Game(data);

      if (this.props.game.challenger.id === undefined) {
        this.setState(game);
      }
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

          const quitGame = () => {
            socket.disconnect();
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
