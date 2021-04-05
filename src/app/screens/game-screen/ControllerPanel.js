import { Component } from 'react';
import { appendClassName, getCookie } from '../../../common/functions';
import ColorSelector from './controller-panel/ColorSelector';

export const action = {
  select: {
    toString: () => 'select',
  },
  confirm: {
    toString: () => 'confirm',
  },
};

export default class ControllerPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
    };
  }

  act = (...args) => {
    if (this.props.onAct) this.props.onAct(...args);
  };

  change = (i) => {
    this.act(this.props.game.turn, action.select, i);
    this.setState({ selected: i });
  };

  confirm = (i) => {
    this.act(this.props.game.turn, action.confirm, i);
    this.setState({ selected: -1 });
  };

  render() {
    const game = this.props.game;
    const myTurn = game.turn && game.turn.id === parseInt(getCookie().id);
    const disabledColors = [game.host && game.host.color, game.challenger && game.challenger.color];
    return (
      <section className={ControllerPanel.name + appendClassName(myTurn ? 'my-turn' : '')}>
        <ColorSelector
          nColors={game.board.nColors}
          onChange={this.change}
          onConfirm={this.confirm}
          selected={this.state.selected}
          disabled={!myTurn}
          disabledColors={disabledColors}
        />
      </section>
    );
  }
}
