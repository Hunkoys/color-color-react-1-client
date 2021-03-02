import { Component } from 'react';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Title from '../components/Title';
import TextBox from '../../generic-components/TextBox';
import Button from '../../generic-components/Button';
import CreateBoard from './CreateBoard';
import OpenGames from './OpenGames';

import AppContext from '../../AppContext';
import Spacer from '../../generic-components/Spacer';
export default class Splash extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppContext.Consumer>
        {(app) => {
          const [screen, goto] = app.screenHook;
          return (
            <Screen type="Splash">
              <Card>
                <Title type="game-title">Color Color</Title>
                <Spacer height="16px" />
                <TextBox hook={app.usernameHook} placeholder=" Your Name" spellCheck="false" />
                <Spacer height="16px" />
                <Button type="block" action={() => goto(CreateBoard)}>
                  NEW GAME
                </Button>
                <Spacer height={app.ui.buttonSpace} />
                <Button type="block" action={() => goto(OpenGames)}>
                  JOIN GAME
                </Button>
              </Card>
            </Screen>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
