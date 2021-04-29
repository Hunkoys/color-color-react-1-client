import { Component } from 'react';
import { appendClassName, getCookie } from '../../../common/functions';
import { socket } from '../../../common/network';
import { pack, unpack } from '../../../common/network/packer';
import Player from '../../data/Player';
import ColorSelector from './controller-panel/ColorSelector';

export const SELECT = 'select';
export const CONFIRM = 'confirm';

export default class ControllerPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected || -1,
    };
    const game = this.props.game;
    const myId = Number(getCookie().id);

    this.me = { id: myId };
    //    socket.connect()

    socket.on('move', (move) => {
      const [playerRaw, action, data] = unpack(move);
      const player = Player(playerRaw);

      this.ask(player, action, data);
    });
  }

  act = (actor, action, args) => {
    if (this.props.onAct) this.props.onAct(actor, action, args);
  };

  change = (i) => {
    const data = [this.me, SELECT, [i]];

    this.ask(...data);
    socket.emit('move', pack(data));
  };

  confirm = (i) => {
    const data = [this.me, CONFIRM, [i]];

    this.ask(...data);
    socket.emit('move', pack(data));
  };

  ask = (requestor, action, args) => {
    const game = this.props.game;
    const requestorsTurn = requestor.id === game.turn.id;

    if (requestorsTurn) {
      if (action === SELECT) this.setState({ selected: args[0] });
      if (action === CONFIRM) this.setState({ selected: -1 });

      this.act(requestor, action, args);
    }
  };

  render() {
    const game = this.props.game;
    const myTurn = game.turn && game.turn.id === this.me.id;
    const callToAction = myTurn ? 'my-turn' : '';

    const disabledColors = [game.host && game.host.color, game.challenger && game.challenger.color];

    return (
      <section className={'ControllerPanel' + appendClassName(callToAction)}>
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
