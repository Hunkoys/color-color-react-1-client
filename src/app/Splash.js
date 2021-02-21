import { Component } from 'react';
import Screen from './Screen';
import Card from './screen/Card';
import Title from './screen/Title';
import TextBox from './screen/TextBox';
import Button from './screen/Button';
import CreateBoard from './CreateBoard';
import OpenGames from './OpenGames';

import AppContext from '../AppContext';
export default class Splash extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppContext.Consumer>
        {(app) => {
          return (
            <Screen type="Splash">
              <Card>
                <Title>Color Color</Title>
                <TextBox store={app.username} placeholder="USERNAME" />
                <Button action={() => app.goto(CreateBoard)}>CREATE</Button>
                <Button action={() => app.goto(OpenGames)}>JOIN</Button>
              </Card>
            </Screen>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
