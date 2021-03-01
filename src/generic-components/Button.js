import { Component } from 'react';
import { appendClassName } from '../common/functions';

const states = { default: '', pressed: 'pressed', hover: 'hover', disabled: 'disabled' };
export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: this.props.className,
    };
  }

  render() {
    const enabled = this.props.enabled === false ? false : true;

    let action = () => {};
    if (this.props.action && enabled) {
      action = () => this.props.action();
    }

    const ableness = enabled ? states.default : states.disabled;

    return (
      <div
        className={
          'Button' +
          appendClassName(this.state.className) +
          appendClassName(this.props.type) +
          appendClassName(ableness)
        }
        onClick={action}
        onMouseDown={() => this.setState({ className: `${states.hover} ${states.pressed}` })}
        onTouchStart={() => this.setState({ className: `${states.hover} ${states.pressed}` })}
        onMouseUp={() => this.setState({ className: states.hover })}
        onTouchEnd={() => this.setState({ className: '' })}
        onMouseEnter={() => this.setState({ className: states.hover })}
        onMouseLeave={() => this.setState({ className: '' })}
      >
        <div className="pill">
          <button>{this.props.children}</button>
        </div>
      </div>
    );
  }
}
