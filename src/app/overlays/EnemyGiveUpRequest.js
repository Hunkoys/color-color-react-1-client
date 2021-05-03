import { Component } from 'react';
import { faces } from '../../common/classes';
import Button from '../../generic-components/Button';
import Spacer from '../../generic-components/Spacer';
import Card from '../components/Card';
import Text from '../components/Text';
import Title from '../components/Title';

export default class EnemyGiveUpRequest extends Component {
  render() {
    const emoji = faces[this.props.enemy.faceName];
    const enemyName = this.props.enemy.username;

    const act = (command) => {
      const onCommand = this.props.onCommand;

      return onCommand ? () => onCommand(command) : null;
    };

    return (
      <Card type="EnemyGiveUpRequest">
        <Title>Rematch Request</Title>
        <Spacer type="h-gutter" />
        <Text>
          {emoji} <span className="highlight-text">{enemyName}</span> wants to play again
        </Text>
        <Spacer type="h-gutter" />
        <Button action={act('play')} type="block">
          PLAY
        </Button>
        <Spacer type="back-button-space" />
        <Button action={act('leave')} type="block">
          LEAVE
        </Button>
      </Card>
    );
  }
}
