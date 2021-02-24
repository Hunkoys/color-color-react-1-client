import { Component } from 'react';
import Screen from '../components/Screen';
import Button from '../../generic-components/Button';
import Title from '../components/Title';
import Splash from '../screens/Splash';

import AppContext from '../../AppContext';
import Card from '../components/Card';

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
