import { Component } from 'react';

export default class Face extends Component {
  render() {
    const { value = '' } = this.props;
    return <div className={Face.name}>{value}</div>;
  }
}
