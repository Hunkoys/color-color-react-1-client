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
    this.populateList = this.populateList.bind(this);
  }

  async componentDidMount() {
    this.showList();
  }

  showList() {
    get('api/data')
      .then((data) => {
        if (this.validateData(data)) {
          const { list } = data;
          this.populateList(list);
        }
      })
      .catch((msg) => {
        console.error(msg);
      });
  }

  validateData(data) {
    let dataIsGood = true;
    if (data === undefined || data.list === undefined) dataIsGood = false;
    else {
      const { list } = data;
      dataIsGood = list.every((openGame) => {
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

  populateList(list) {
    const openGames = list.map((openGame) => (
      <OpenGamesListItem key={openGame.id} value={openGame.id} data={openGame} />
    ));

    this.setState({ openGames });
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
                  {this.state.openGames}
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
