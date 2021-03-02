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
    const [value, setValue] = this.props.hook;
    console.log(value);
    return (
      <section className={'TextBox' + appendClassName(this.props.type)}>
        <input
          className="input"
          type="text"
          placeholder={this.props.placeholder}
          onChange={({ target }) => setValue(target.value)}
          defaultValue={value}
          spellCheck={this.props.spellCheck}
        />
      </section>
    );
  }
}
