import { Component } from 'react';
import { appendClassName } from '../../../../../common/functions';

export default class Score extends Component {
  render() {
    const { value = '_', color = -1 } = this.props;
    return <div className={'Score' + appendClassName(`color-${color}`)}>{value}</div>;
  }
}
