import { Component } from 'react';

export default class Card extends Component {
  render() {
    return <section className={`Card${this.props.type ? ` ${this.props.type}` : ''}`}>{this.props.children}</section>;
  }
}
