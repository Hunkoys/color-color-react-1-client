import { Component } from 'react';

export default class Spacer extends Component {
  render() {
    return <div className="spacer" style={{ ...this.props }}></div>;
  }
}
