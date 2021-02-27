import { Component } from 'react';
import { appendClassName } from '../../common/functions';

export default class OpenGameItem extends Component {
  render() {
    const { name, boardSize, id } = this.props.data;
    return (
      <div className={'OpenGameItem' + appendClassName(this.props.type)} id={id}>
        <div className="name">{name}</div>
        <div className="board-size">{`${boardSize.w} x ${boardSize.h}`}</div>
      </div>
    );
  }
}
