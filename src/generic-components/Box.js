import { Component } from 'react';
import { appendClassName } from '../common/functions';

export default class Box extends Component {
  render() {
    return (
      <section className={'Box' + appendClassName(this.props.type)} style={this.props.style}>
        {this.props.children}
      </section>
    );
  }
}
