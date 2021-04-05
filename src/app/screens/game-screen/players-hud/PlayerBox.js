import { Component } from 'react';
import { appendClassName } from '../../../../common/functions';
import Spacer from '../../../../generic-components/Spacer';
import Text from '../../../components/Text';
import Player from '../../../data/Player';
import Face from './player-box/Face';
import Score from './player-box/Score';

export default class PlayerBox extends Component {
  render() {
    const {
      pos = 'left',
      player = Player({
        username: '-',
      }),
    } = this.props;
    return (
      <section className={PlayerBox.name + appendClassName(pos)}>
        <Text type="username">{player.username}</Text>
        <Spacer type="h-gutter" />
        <section className="lower-block">
          <Face value={player.face} />
          <Score value={player.score} color={player.color} />
        </section>
      </section>
    );
  }
}
