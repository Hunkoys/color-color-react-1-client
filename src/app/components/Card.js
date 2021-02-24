import { Component } from 'react';
import { appendClassName } from '../../common/functions';

export default class Card extends Component {
  render() {
    return <section className={'Card' + appendClassName(this.props.type)}>{this.props.children}</section>;
  }
}
