import { Component } from 'react';
import Splash from '../screens/Splash';
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

export default class OpenGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openGames: [],
      selectedOpenGameId: null,
    };
  }

  componentDidMount() {
    this.showList();
  }

  showList() {
    get('api/open-games')
      .then((openGames) => {
        if (this.validateList(openGames)) {
          this.setState({ openGames });
        }
      })
      .catch((msg) => {
        console.error(msg);
      });
  }

  validateList(openGames) {
    let dataIsGood = true;
    if (openGames === undefined) dataIsGood = false;
    else {
      dataIsGood = openGames.every((openGame) => {
        if (openGame === undefined) return false;
        if (openGame.id === undefined) return false;
        if (openGame.name === undefined) return false;
        if (openGame.boardSize === undefined) return false;
        if (openGame.boardSize.w === undefined) return false;
        if (openGame.boardSize.h === undefined) return false;
        return true;
        /* Try object check {
          id: String,
          name: String,
          boardSize: {
            w: Number,
            h: Number
          }
        } */
      });
    }
    return dataIsGood;
  }

  render() {
    const somethingSelected = this.state.selectedOpenGameId ? true : false;

    return (
      <AppContext.Consumer>
        {(app) => {
          const [screen, goto] = app.screenHook;
          return (
            <Screen type={'OpenGames'}>
              <Card>
                <Title>Open Games</Title>
                <ListPit
                  type="block"
                  placeholder={<Title>Empty</Title>}
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
                      post('api/join', this.state.selectedOpenGameId);
                    }}
                  >
                    JOIN
                  </Button>
                </Box>
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
