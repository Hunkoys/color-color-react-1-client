import { Component } from 'react';
import { appendClassName } from '../common/functions';

export default class Spacer extends Component {
  render() {
    return <div className={'Spacer' + appendClassName(this.props.type)} style={{ ...this.props }}></div>;
  }
}
