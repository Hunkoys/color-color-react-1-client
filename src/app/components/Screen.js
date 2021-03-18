import { Component } from 'react';

export default class Screen extends Component {
  render() {
    return <section className={`Screen${this.props.name ? ` ${this.props.name}` : ''}`}>{this.props.children}</section>;
  }
}
