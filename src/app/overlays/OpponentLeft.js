import { Component } from 'react';
import AppContext from '../../AppContext';
import { faces } from '../../common/classes';
import Button from '../../generic-components/Button';
import Spacer from '../../generic-components/Spacer';
import Card from '../components/Card';
import Title from '../components/Title';
import Splash from '../screens/Splash';

export default class OpponentLeft extends Component {
  render() {
    return (
      <Card type="OpponentLeft">
        <Title>Game Over</Title>
        <span>
          Too bad!
          <span className="highlight-text">{` ${faces[this.props.enemy.faceName]} ${this.props.enemy.username}`}</span>{' '}
          has left the game
        </span>
        <Spacer type="h-gutter" />
        <Button action={this.props.action}>HOME</Button>
      </Card>
    );
  }
}
