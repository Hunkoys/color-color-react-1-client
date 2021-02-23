import { Component } from 'react';
import Screen from './Screen';
import Button from './screen/Button';
import Title from './screen/Title';
import Splash from './Splash';

import AppContext from '../AppContext';
import Card from './screen/Card';

export default class OpenGames extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {(app) => (
          <Screen type={'OpenGames'}>
            <Card>
              <Title>Online Players</Title>
              <Button action={() => app.goto(Splash)}>Home</Button>
            </Card>
          </Screen>
        )}
      </AppContext.Consumer>
    );
  }
}
