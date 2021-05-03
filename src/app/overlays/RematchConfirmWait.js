import { Component } from 'react';
import { faces } from '../../common/classes';
import Button from '../../generic-components/Button';
import Spacer from '../../generic-components/Spacer';
import Card from '../components/Card';
import Text from '../components/Text';
import Title from '../components/Title';

export default class RematchConfirmWait extends Component {
  render() {
    const enemyEmoji = faces[this.props.enemy.faceName];
    const enemyName = this.props.enemy.username;

    const act = (command) => {
      const onCommand = this.props.onCommand;

      return onCommand ? () => onCommand(command) : null;
    };

    return (
      <Card type="RematchConfirmWait">
        <Title>Waiting For Opponent</Title>
        <Text>
          Rematch request was sent to {enemyEmoji} <span className="highlight-text">{enemyName}</span>
        </Text>
        <Spacer type="h-gutter" />
        <Text>Waiting for response</Text>
        <Spacer type="h-gutter" />

        <Button action={act('quit')}>Quit</Button>
      </Card>
    );
  }
}
