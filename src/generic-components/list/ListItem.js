import { Component } from 'react';
import { appendClassName } from '../../common/functions';

export default class ListItem extends Component {
  render() {
    return <li className={'ListItem' + appendClassName(this.props.type)}>{this.props.children}</li>;
  }
}
