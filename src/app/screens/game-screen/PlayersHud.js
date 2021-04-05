import { Component } from 'react';
import Player from '../../data/Player';
import PlayerBox from './players-hud/PlayerBox';

export default class PlayersHud extends Component {
  render() {
    const { left, right } = this.props;
    console.log(left);
    return (
      <section className={PlayersHud.name}>
        <PlayerBox pos="left" player={left} />
        <PlayerBox pos="right" player={right} />
      </section>
    );
  }
}
