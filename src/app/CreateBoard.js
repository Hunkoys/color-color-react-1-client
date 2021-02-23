import { Component } from 'react';
import Screen from './Screen';
import Card from './screen/Card';
import Title from './screen/Title';
import Button from './screen/Button';
import Splash from './Splash';

import AppContext from '../AppContext';
import Spacer from './screen/Spacer';

export default class CreateBoard extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {(app) => (
          <Screen type={'CreateBoard'}>
            <Card>
              <Title>Board Size</Title>
              <Button type="block">7 x 7</Button>
              <Spacer height={app.ui.buttonSpace} />
              <Button type="block">11 x 11</Button>
              <Spacer height={app.ui.buttonSpace} />
              <Button type="block">15 x 15</Button>
              <Spacer height={app.ui.backButtonSpace} />
              <Button type="block" action={() => app.goto(Splash)}>
                Home
              </Button>
            </Card>
          </Screen>
        )}
      </AppContext.Consumer>
    );
  }
}
