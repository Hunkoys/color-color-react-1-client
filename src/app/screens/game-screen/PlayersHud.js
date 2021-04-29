import { Component } from 'react';
import Player from '../../data/Player';
import PlayerBox from './players-hud/PlayerBox';

export default class PlayersHud extends Component {
  render() {
    const { left, right } = this.props;
    return (
      <section className={PlayersHud.name}>
        <PlayerBox pos="left" player={left} highlight={this.props.turn === 'left'} />
        <PlayerBox pos="right" player={right} highlight={this.props.turn === 'right'} />
      </section>
    );
  }
}
