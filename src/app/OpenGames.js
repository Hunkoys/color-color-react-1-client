import { Component } from 'react';
import AppContext from '../AppContext';
import Screen from './Screen';
import Button from './screen/Button';
import Splash from './Splash';

export default class OpenGames extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {(app) => (
          <Screen>
            <h1>Online Players</h1>
            <Button action={() => app.goto(Splash)}>Home</Button>
          </Screen>
        )}
      </AppContext.Consumer>
    );
  }
}
