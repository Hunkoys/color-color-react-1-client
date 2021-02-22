import { Component } from 'react';

export default class Button extends Component {
  render() {
    return (
      <div className={`Button${this.props.type ? ` ${this.props.type}` : ''}`} onClick={this.props.action}>
        <button>{this.props.children}</button>
      </div>
    );
  }
}
