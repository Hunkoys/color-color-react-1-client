import { Component } from 'react';
import Screen from '../components/Screen';
import Title from '../components/Title';
import Card from '../components/Card';
import Button from '../../generic-components/Button';
import Splash from './Splash';

import AppContext from '../../AppContext';
import Spacer from '../../generic-components/Spacer';

export default class CreateBoard extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {(app) => {
          const [screen, goto] = app.screenHook;
          return (
            <Screen type={'CreateBoard'}>
              <Card>
                <Title>Board Size</Title>
                <Button type="block">7 x 7</Button>
                <Spacer type="h-gutter" />
                <Button type="block">11 x 11</Button>
                <Spacer type="h-gutter" />
                <Button type="block">15 x 15</Button>
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
