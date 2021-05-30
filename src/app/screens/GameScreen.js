import Splash from './Splash';
import { Component, Fragment } from 'react';
import AppContext from '../../AppContext';
import { faces } from '../../common/classes';
import { getCookie } from '../../common/functions';
import { server, socket } from '../../common/network';
import { unpack } from '../../common/network/packer';
import Box from '../../generic-components/Box';
import Button from '../../generic-components/Button';
import Spacer from '../../generic-components/Spacer';
import Card from '../components/Card';
import Screen from '../components/Screen';
import Text from '../components/Text';
import Title from '../components/Title';
import Game from '../data/Game';
import Player from '../data/Player';
import logic from '../game/logic';
import GiveUpConfirmation from '../overlays/GiveUpConfirmation';
import GameOver, { keywords as gameOverKeywords, keywords } from '../overlays/GameOver';
import Board from './game-screen/Board';
import ControllerPanel, { CONFIRM } from './game-screen/ControllerPanel';
import Face from './game-screen/players-hud/player-box/Face';
import Score from './game-screen/players-hud/player-box/Score';
import PlayersHud from './game-screen/PlayersHud';
import LoadingScreen from './LoadingScreen';
import Menu from '../overlays/Menu';
import OpponentLeft from '../overlays/OpponentLeft';
import QuitConfirmation from '../overlays/QuitConfirmation';
import EnemyGiveUpRequest from '../overlays/EnemyGiveUpRequest';
import RematchConfirmWait from '../overlays/RematchConfirmWait';
import ReturnToGameScreen from './ReturnToGameScreen';

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

function initState(game) {
  const [me, enemy] = is(Player(getCookie()), game.host) ? [game.host, game.challenger] : [game.challenger, game.host];

  return {
    ...game,
    menuIsOpen: false,
    quitConfirmIsOpen: false,
    giveUpConfirmIsOpen: false,
    enemyGiveUpIsOpen: false,
    rematchConfirmWaitIsOpen: false,
    opponentLeftIsOpen: enemy.id === undefined && game.waitingForOpponent === false,
  };
}

export default class GameScreen extends Component {
  constructor(props) {
    super(props);

    const game = this.props.game;
    const [me, enemy] = is(Player(getCookie()), game.host)
      ? [game.host, game.challenger]
      : [game.challenger, game.host];

    this.state = initState(game);

    socket.connect();
    socket.on('player-joined', (data) => {
      const game = Game(data);

      if (this.props.game.waitingForOpponent) {
        this.setState(game);
      }
    });

    socket.on('enemy-quit', () => {
      this.setState({ opponentLeftIsOpen: true });
    });

    socket.on('rematch-granted', (data) => {
      const game = Game(data);

      this.setState(initState(game));
    });

    socket.on('rematch-requested', () => {
      this.setState({ enemyGiveUpIsOpen: true });
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
    this.setState(({ host, challenger, board }) => {
      host.score = host.squares.all.length;
      challenger.score = challenger.squares.all.length;

      const nOfSquares = board.size.w * board.size.h;
      const totalScore = host.score + challenger.score;

      const gameOver = nOfSquares === totalScore;

      return { host, challenger, gameOver };
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

  quit = (then) => {
    server('quit-game')
      .then((success) => {
        if (success) {
          socket.emit('quit');
          socket.disconnect();
          then();
        }
        // else setScreen(failedScreen)
      })
      .catch((error) => {});
  };

  render() {
    const game = Game(this.state);

    return (
      <AppContext.Consumer>
        {(app) => {
          const [screen, setScreen] = app.screenHook;
          const [me, enemy] =
            getCookie().id == game.host.id ? [game.host, game.challenger] : [game.challenger, game.host];

          const openMenu = () => {
            this.setState({ menuIsOpen: true });
          };

          const menuCommand = (command) => {
            if (command === 'back') {
              this.setState({ menuIsOpen: false });
            } else if (command === 'quit') {
              this.setState({ quitConfirmIsOpen: true });
            } else if (command === 'rematch') {
              this.setState({ giveUpConfirmIsOpen: true });
            }
          };

          const quitCommand = (command) => {
            if (command === 'quit') {
              this.quit(() => setScreen(<Splash />));
              setScreen(<LoadingScreen />);
            } else if (command === 'cancel') this.setState({ quitConfirmIsOpen: false });
          };

          const giveUpCommand = (command) => {
            if (command === 'confirm') {
              socket.emit('request-rematch');
              me.requestedRematch = true;
              this.setState({ rematchConfirmWaitIsOpen: true, ...applyToRole(me, game) });
            } else if (command === 'cancel') {
              this.setState({ giveUpConfirmIsOpen: false });
            }
          };

          const goHome = () => {
            this.quit(() => setScreen(<Splash />));
            setScreen(<LoadingScreen />);
          };

          const gameOverCommand = (command) => {
            if (command === gameOverKeywords.playAgain) {
              socket.emit('request-rematch');
              me.requestedRematch = true;
              this.setState(applyToRole(me, game));
            } else if (command === gameOverKeywords.home) {
              this.quit(() => setScreen(<Splash />));
              setScreen(<LoadingScreen />);
            }
          };
          let status, gameOverContent;

          if (this.state.gameOver) {
            status = this.state.opponentLeftIsOpen ? keywords.enemyLeft : me.requestedRematch ? keywords.waiting : '';

            const iWon = me.score > enemy.score;

            gameOverContent = iWon ? (
              <Fragment>
                <Title>You Won!</Title>
                <Face value={faces[me.faceName]} />
                <Spacer type="h-gutter" />
                <Box type="score">
                  <Score value={me.score} color={me.color} />
                  <Text type="lrg">-</Text>
                  <Score value={enemy.score} color={enemy.color} />
                </Box>
                <Spacer type="h-gutter" />
              </Fragment>
            ) : (
              <Fragment>
                <Title>You Lost</Title>
                <Face value="👎" />
                <Spacer type="h-gutter" />
              </Fragment>
            );
          }

          const enemyGiveUpCommand = (command) => {
            if (command === 'play') {
              socket.emit('request-rematch');
              me.requestedRematch = true;
              this.setState(applyToRole(me, game));
            } else if (command === 'leave') {
              this.quit(() => setScreen(<Splash />));
              setScreen(<LoadingScreen />);
            }
          };

          const rematchConfirmWaitCommand = (command) => {
            if (command === 'quit') {
              this.quit(() => setScreen(<Splash />));
              setScreen(<LoadingScreen />);
            }
          };

          const overlay = this.state.gameOver ? (
            <GameOver onCommand={gameOverCommand} status={status} enemy={enemy}>
              {gameOverContent}
            </GameOver>
          ) : this.state.opponentLeftIsOpen ? (
            <OpponentLeft enemy={enemy} action={goHome} />
          ) : this.state.enemyGiveUpIsOpen ? (
            <EnemyGiveUpRequest onCommand={enemyGiveUpCommand} enemy={enemy} />
          ) : this.state.menuIsOpen ? (
            this.state.quitConfirmIsOpen ? (
              <QuitConfirmation onCommand={quitCommand} />
            ) : this.state.giveUpConfirmIsOpen ? (
              this.state.rematchConfirmWaitIsOpen ? (
                <RematchConfirmWait onCommand={rematchConfirmWaitCommand} enemy={enemy} />
              ) : (
                <GiveUpConfirmation onCommand={giveUpCommand} />
              )
            ) : (
              <Menu onCommand={menuCommand} />
            )
          ) : undefined;

          const placement = {
            left: game.host,
            right: game.challenger,
          };
          const turn = is(game.turn, placement.left) ? 'left' : is(game.turn, placement.right) ? 'right' : 'none';

          return (
            <Screen name="GameScreen" overlay={overlay}>
              <Card>
                <Button action={openMenu}>MENU</Button>
                <Spacer type="h-gutter" />
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
