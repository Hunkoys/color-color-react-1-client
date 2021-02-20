import { Component } from 'react';

export default class Screen extends Component {
  render() {
    return <section>{this.props.children}</section>;
  }
}
