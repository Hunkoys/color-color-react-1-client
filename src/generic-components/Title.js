import { Component } from 'react';
import { appendClassName } from '../common/functions';

export default class Title extends Component {
  render() {
    return (
      <h1 id={this.props.id} className={'Title' + appendClassName(this.props.type)}>
        {this.props.children}
      </h1>
    );
  }
}
