import { Component } from 'react';

export default class Card extends Component {
  render() {
    return <section className="card">{this.props.children}</section>;
  }
}
