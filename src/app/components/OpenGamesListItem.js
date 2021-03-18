import { Component } from 'react';
import { appendClassName } from '../../common/functions';
import Game from '../data/Game';

export default class OpenGameItem extends Component {
  render() {
    const { id, board, host } = Game(this.props.data);
    return (
      <div className={'OpenGamesListItem' + appendClassName(this.props.type)} id={id}>
        <div className="name">{host.username}</div>
        <div className="board-size">{`${board.size.w} x ${board.size.h}`}</div>
      </div>
    );
  }
}
