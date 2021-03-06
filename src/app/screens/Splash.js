import { Component } from 'react';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Title from '../components/Title';
import TextBox from '../../generic-components/TextBox';
import Button from '../../generic-components/Button';
import CreateGameScreen from './CreateGameScreen';
import JoinGameScreen from './JoinGameScreen';

import AppContext from '../../AppContext';
import Spacer from '../../generic-components/Spacer';
import GridSelector from '../components/GridSelector';
import { faces } from '../../common/classes';
import Container from '../../generic-components/Container';

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
            <Screen name="Splash">
              <Card>
                <Title type="game-title">Color Color</Title>
                <Spacer type="h-gutter" />
                <Container type="player-info">
                  <GridSelector hook={app.faceHook} rowSize={5}>
                    {faces}
                  </GridSelector>
                  <Spacer type="v-gutter" />
                  <TextBox hook={app.usernameHook} placeholder=" Your Name" spellCheck="false" />
                </Container>
                <Spacer type="h-gutter" />
                <Button type="block" action={() => goto(<CreateGameScreen />)}>
                  NEW GAME
                </Button>
                <Spacer type="h-gutter" />
                <Button type="block" action={() => goto(<JoinGameScreen />)}>
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
