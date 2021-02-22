import { Component } from 'react';
import Screen from './Screen';
import Card from './screen/Card';
import Title from './screen/Title';
import Button from './screen/Button';
import Splash from './Splash';

import AppContext from '../AppContext';

export default class CreateBoard extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {(app) => (
          <Screen type={'CreateBoard'}>
            <Card>
              <Title>Size</Title>
              <Button>7 x 7</Button>
              <Button>11 x 11</Button>
              <Button>15 x 15</Button>
              <Button action={() => app.goto(Splash)}>Home</Button>
            </Card>
          </Screen>
        )}
      </AppContext.Consumer>
    );
  }
}
