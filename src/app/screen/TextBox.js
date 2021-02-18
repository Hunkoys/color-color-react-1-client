import { Component } from 'react';

export default class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || '',
    };
  }

  render() {
    return (
      <input
        type="text"
        placeholder={this.props.placeholder}
        onChange={(e) => (this.props.store[0] = e.target.value)}
        defaultValue={this.props.store[0]}
      />
    );
  }
}
