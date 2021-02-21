import { Component } from 'react';

export default class Screen extends Component {
  render() {
    return <section className={`Screen${this.props.type ? ` ${this.props.type}` : ''}`}>{this.props.children}</section>;
  }
}
