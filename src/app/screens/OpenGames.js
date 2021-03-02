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

// Server

const dataServer = {
  list: [
    {
      id: 'skaj1',
      name: 'Maria',
      boardSize: {
        w: 15,
        h: 15,
      },
    },
    {
      id: 'hueq2',
      name: 'John',
      boardSize: {
        w: 7,
        h: 7,
      },
    },
    {
      id: 'uihowr3',
      name: 'Tanglo',
      boardSize: {
        w: 15,
        h: 15,
      },
    },
    {
      id: '263hed4',
      name: 'Brogodog',
      boardSize: {
        w: 21,
        h: 21,
      },
    },
  ],
};

const dataString = JSON.stringify(dataServer);

// Server

export default class OpenGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openGames: [],
      selectedOpenGameId: null,
      brup: [],
    };
    this.populateList = this.populateList.bind(this);

    fetch('data').then((res) => console.log(res.status));
  }

  componentDidMount() {
    this.fetchList(this.populateList);
  }

  fetchList(callback) {
    fetch('api/data').then((res) => {
      if (res.status !== 200) {
        console.log(`Looks like there was a problem. Status Code: ${res.status}`);
        callback([]);
        return;
      }

      res.json().then((data) => {
        console.log('Fetched data', data);
        const cleanData = this.validateData(data);
        if (cleanData.list === undefined) {
          console.error('Fetched Data is not clean. Please check server');
          callback([]);
        } else callback(cleanData.list);
      });
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
    if (!dataIsGood) return {};

    return data;
  }

  populateList(list) {
    const openGames = list.map((openGame) => (
      <OpenGamesListItem key={openGame.id} value={openGame.id} data={openGame} />
    ));

    this.setState({ openGames });
  }

  render() {
    const hasSelected = this.state.selectedOpenGameId ? true : false;
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
                  <Button type="block" action={() => this.fetchList(this.populateList)}>
                    REFRESH
                  </Button>
                  <Spacer type="v-gutter" />
                  <Button
                    type="block call-to-action"
                    disabled={!hasSelected}
                    action={() => console.log(this.state.selectedOpenGameId)}
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
