import { Component } from 'react';
import Splash from '../screens/Splash';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Title from '../components/Title';
import Button from '../../generic-components/Button';
import Spacer from '../../generic-components/Spacer';
import Box from '../../generic-components/Box';
import ListPit from '../components/ListPit';
import OpenGameItem from '../components/OpenGameItem';

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
      id: 'uihowr9',
      name: 'Tanglo',
      boardSize: {
        w: 15,
        h: 15,
      },
    },
    {
      id: '263hed',
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
    };
    this.populateList = this.populateList.bind(this);
  }

  componentDidMount() {
    this.fetchList(this.populateList);
  }

  fetchList(then) {
    console.log('Fetched data');
    const data = JSON.parse(dataString);
    const cleanData = this.validateData(data);
    if (cleanData.list === undefined) console.error('Fetched Data is not clean. Please check server');
    then(cleanData);
  }

  validateData(data) {
    let dataIsGood = true;
    if (data === undefined || data.list === undefined) dataIsGood = false;
    else {
      const { list } = data;
      dataIsGood = list.every((item) => {
        if (item === undefined) return false;
        if (item.id === undefined) return false;
        if (item.name === undefined) return false;
        if (item.boardSize === undefined) return false;
        if (item.boardSize.w === undefined) return false;
        if (item.boardSize.h === undefined) return false;
        return true;
      });
    }
    if (!dataIsGood) return {};

    return data;
  }

  populateList(data) {
    // const data = JSON.parse(dataRaw);
    const list = data.list || [];
    const componentList = list.map((item) => <OpenGameItem key={item.id}>{item}</OpenGameItem>);

    this.setState({
      openGames: componentList,
    });
  }

  render() {
    return (
      <AppContext.Consumer>
        {(app) => (
          <Screen type={'OpenGames'}>
            <Card>
              <Title>Open Games</Title>
              <ListPit type="block" placeholder={<Title>Empty</Title>}>
                {this.state.openGames}
              </ListPit>
              <Spacer height={app.ui.buttonSpace} />
              <Box type="button-bar bb-horizontal">
                <Button type="block" action={() => this.fetchList(this.populateList)}>
                  REFRESH
                </Button>
                <Spacer width={app.ui.buttonSpace} />
                <Button type="block" disabled={this.state.selectedGame ? false : true}>
                  JOIN
                </Button>
              </Box>
              <Spacer height={app.ui.backButtonSpace} />
              <Button type="block" action={() => app.goto(Splash)}>
                HOME
              </Button>
            </Card>
          </Screen>
        )}
      </AppContext.Consumer>
    );
  }
}
