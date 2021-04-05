import { Component } from 'react';
import Splash from './Splash';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Title from '../components/Title';
import Button from '../../generic-components/Button';
import Spacer from '../../generic-components/Spacer';
import Box from '../../generic-components/Box';
import ListPit from '../components/ListPit';
import OpenGamesListItem from '../components/OpenGamesListItem';

import AppContext from '../../AppContext';
import { get, post } from '../../common/network';
import Game from '../data/Game';
import LoadingScreen from './LoadingScreen';
import GameScreen from './GameScreen';

export default class JoinGameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openGames: [],
      selectedOpenGameId: null,
      listPlaceholder: <Title>Empty</Title>,
    };
  }

  componentDidMount() {
    this.showList();
  }

  showList() {
    this.setState({
      openGames: [],
      listPlaceholder: <Title>...</Title>,
    });
    get('api/open-games')
      .then((openGames) => {
        if (this.validateList(openGames)) {
          this.setState({ openGames });
        }
      })
      .catch((msg) => {
        console.error(msg);
      })
      .finally(() => {
        this.setState({ listPlaceholder: <Title>Empty</Title> });
      });
  }

  validateList(openGames) {
    let dataIsGood = true;
    if (openGames === undefined) dataIsGood = false;
    else {
      dataIsGood = openGames.every((openGame) => {
        const game = Game(openGame);
        if (game === undefined) return false;
        if (game.id === undefined) return false;
        if (game.host.username === undefined) return false;
        if (game.board === undefined) return false;
        if (game.board.size.w === undefined) return false;
        if (game.board.size.h === undefined) return false;
        return true;
      });
    }
    return dataIsGood;
  }

  render() {
    const somethingSelected = this.state.selectedOpenGameId ? true : false;

    return (
      <AppContext.Consumer>
        {(app) => {
          const [screen, setScreen] = app.screenHook;
          return (
            <Screen name="OpenGames">
              <Card>
                <Title>Open Games</Title>
                <ListPit
                  type="block"
                  placeholder={this.state.listPlaceholder}
                  select={(selectedOpenGameId) => {
                    this.setState({ selectedOpenGameId });
                  }}
                >
                  {this.state.openGames.map((openGame) => (
                    <OpenGamesListItem key={openGame.id} value={openGame.id} data={openGame} />
                  ))}
                </ListPit>
                <Spacer type="h-gutter" />
                <Box type="button-bar bb-horizontal">
                  <Button type="block" action={this.showList.bind(this)}>
                    REFRESH
                  </Button>
                  <Spacer type="v-gutter" />
                  <Button
                    type="block call-to-action"
                    disabled={somethingSelected === false}
                    action={() => {
                      setScreen(<LoadingScreen />);
                      post('api/join-game', this.state.selectedOpenGameId).then(() => setScreen(<GameScreen />));
                    }}
                  >
                    JOIN
                  </Button>
                </Box>
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
