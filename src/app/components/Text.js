import { Component } from 'react';
import { appendClassName } from '../../common/functions';

export default class Text extends Component {
  render() {
    return <div className={Text.name + appendClassName(this.props.type)}>{this.props.children}</div>;
  }
}
