import { Component } from 'react';
import { appendClassName } from '../common/functions';

// Currently unsafe

export default class List extends Component {
  render() {
    return <ul className={'List' + appendClassName(this.props.type)}>{this.props.children}</ul>;
  }
}

export class ListItem extends Component {
  render() {
    return <li className={'ListItem' + appendClassName(this.props.type)}>{this.props.children}</li>;
  }
}
