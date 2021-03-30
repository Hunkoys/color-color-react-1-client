import { Component } from 'react';
import { appendClassName } from '../../../common/functions';
import ColorButton from './color-panel/ColorButton';

const states = ['', 'selected', 'disabled'];

export default class ColorPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
    };
  }

  onChange = this.props.onChange || (() => {});
  onConfirm = this.props.onConfirm || (() => {});

  createButtonArray() {
    const buttonArray = [];
    const n = this.props.nColors || 0;
    const selectedParamIsArray = this.state.selected instanceof Array;
    const disabledParamIsArray = this.props.disabled instanceof Array;
    for (let i = 0; i < n; i++) {
      const isSelected = selectedParamIsArray ? this.state.selected.includes(i) : this.state.selected === i;
      const isDisabled = disabledParamIsArray ? this.props.disabled.includes(i) : this.props.disabled === i;

      const stateIndex = isDisabled ? 3 : isSelected ? 1 : 0;

      buttonArray.push(
        <ColorButton
          key={`color${i}`}
          action={() => {
            if (isSelected) this.onConfirm(i);
            else this.onChange(i);
            this.setState({ selected: i });
          }}
          disabled={isDisabled}
          type={`color-${i}` + appendClassName(states[stateIndex])}
        ></ColorButton>
      );
    }

    return buttonArray;
  }

  render() {
    const buttonArray = this.createButtonArray();
    return <section className={'ColorPanel' + appendClassName(this.props.type)}>{buttonArray}</section>;
  }
}
