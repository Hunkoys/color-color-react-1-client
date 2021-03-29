import { Component } from 'react';
import { appendClassName } from '../../../../common/functions';

export default class Square extends Component {
  render() {
    return <div className={'Square' + appendClassName(this.props.type) + appendClassName(this.props.color)}></div>;
  }
}
