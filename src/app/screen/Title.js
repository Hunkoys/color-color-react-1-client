import { Component } from 'react';

export default class Title extends Component {
  render() {
    return <h1 className={`Title${this.props.type ? ` ${this.props.type}` : ''}`}>{this.props.children}</h1>;
  }
}
