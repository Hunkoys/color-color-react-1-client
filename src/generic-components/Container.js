import { Component } from 'react';
import { appendClassName } from '../common/functions';

export default class Container extends Component {
  render() {
    return <section className={'Container' + appendClassName(this.props.type)}>{this.props.children}</section>;
  }
}
