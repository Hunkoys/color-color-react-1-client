import { Component } from 'react';
import { faces } from '../../../../common/classes';
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

    const faceName = player.faceName;
    return (
      <section className={PlayerBox.name + appendClassName(pos) + appendClassName(this.props.highlight && 'highlight')}>
        <Text type="username">{player.username}</Text>
        <Spacer type="h-gutter" />
        <section className="lower-block">
          <Face value={faces[faceName]} />
          <Score value={player.score} color={player.color} />
        </section>
      </section>
    );
  }
}
