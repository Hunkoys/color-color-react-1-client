import { Component } from 'react';
import { appendClassName } from '../common/functions';

export default class Pit extends Component {
  render() {
    return <div className={'Pit' + appendClassName(this.props.type)}>{this.props.children}</div>;
  }
}
