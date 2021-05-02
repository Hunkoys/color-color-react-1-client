import { Component } from 'react';
import AppContext from '../../AppContext';
import { faces } from '../../common/classes';
import Button from '../../generic-components/Button';
import Spacer from '../../generic-components/Spacer';
import Card from '../components/Card';
import Title from '../components/Title';
import Splash from './Splash';

export default class OpponentLeft extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {(app) => {
          const [screen, setScreen] = app.screenHook;

          return (
            <Card type="OpponentLeft">
              <Title>Game Over</Title>
              <span>
                Too bad!
                <span className="highlight-text">{` ${faces[this.props.enemy.faceName]} ${
                  this.props.enemy.username
                }`}</span>{' '}
                must have pussied out. They left the game
              </span>
              <Spacer type="h-gutter" />
              <Button action={() => setScreen(<Splash />)}>HOME</Button>
            </Card>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
