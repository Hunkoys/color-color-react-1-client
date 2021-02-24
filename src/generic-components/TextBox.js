import { Component } from 'react';
import { appendClassName } from '../common/functions';

export default class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || '',
    };
  }

  render() {
    return (
      <section className={'TextBox' + appendClassName(this.props.type)}>
        <input
          className="input"
          type="text"
          placeholder={this.props.placeholder}
          onChange={({ target }) => this.props.store.set(target.value)}
          defaultValue={this.props.store.get()}
        />
      </section>
    );
  }
}
