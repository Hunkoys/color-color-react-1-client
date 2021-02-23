import { Component } from 'react';
import { appendClassName } from '../../standard/standard';

export default class Pit extends Component {
  render() {
    return <div className={'Pit' + appendClassName(this.props.type)}></div>;
  }
}
