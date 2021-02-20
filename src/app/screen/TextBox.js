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
        onChange={({ target }) => this.props.store.set(target.value)}
        defaultValue={this.props.store.get()}
      />
    );
  }
}
