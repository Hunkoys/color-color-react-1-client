import { Component } from 'react';
import { appendClassName } from '../../common/functions';

export default class Screen extends Component {
  render() {
    return <section className={'Screen' + appendClassName(this.props.name)}>{this.props.children}</section>;
  }
}
