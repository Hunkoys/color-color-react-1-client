import { Component } from 'react';
import AppContext from '../../AppContext';
import { get } from '../../common/network';
import Button from '../../generic-components/Button';
import Card from '../components/Card';
import Screen from '../components/Screen';
import Splash from './Splash';

export default class Game extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {(app) => {
          const [screen, setScreen] = app.screenHook;
          return (
            <Screen name="Game">
              <Card>
                <Button
                  type="block"
                  action={() => {
                    get('api/quit-game').then(setScreen(Splash));
                  }}
                >
                  Quit
                </Button>
              </Card>
            </Screen>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
