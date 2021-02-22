import { Component } from 'react';
import Screen from './Screen';
import Button from './screen/Button';
import Title from './screen/Title';
import Splash from './Splash';

import AppContext from '../AppContext';

export default class OpenGames extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {(app) => (
          <Screen type={'OpenGames'}>
            <Title>Online Players</Title>
            <Button action={() => app.goto(Splash)}>Home</Button>
          </Screen>
        )}
      </AppContext.Consumer>
    );
  }
}
