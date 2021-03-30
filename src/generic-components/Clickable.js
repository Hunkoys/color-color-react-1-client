import { Component } from 'react';
import { appendClassName } from '../common/functions';

const states = { default: '', pressed: 'pressed', hover: 'hover', disabled: 'disabled' };
export default class Clickable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: this.props.className,
    };
  }

  render() {
    const disabled = this.props.disabled === true ? true : false;

    let action = () => {};
    if (this.props.action && !disabled) {
      action = () => this.props.action();
    }

    const ableness = disabled ? states.disabled : states.default;

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
        {this.props.children}
      </div>
    );
  }
}
