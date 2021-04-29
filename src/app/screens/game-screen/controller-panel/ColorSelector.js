import { Component } from 'react';
import { appendClassName } from '../../../../common/functions';
import ColorButton from './color-selector/ColorButton';

const states = ['', 'selected', 'disabled'];

export default class ColorSelector extends Component {
  constructor(props) {
    super(props);
  }

  change = (i) => {
    if (this.props.onChange && !this.props.disabled) this.props.onChange(i);
  };

  confirm = (i) => {
    if (this.props.onConfirm && !this.props.disabled) this.props.onConfirm(i);
  };

  createButtonArray() {
    const buttonArray = [];
    const n = this.props.nColors || 0;
    const selected = this.props.selected;
    const disabledColors = this.props.disabledColors;

    const selectedParamIsArray = selected instanceof Array;
    const disabledColorsParamIsArray = disabledColors instanceof Array;

    for (let i = 0; i < n; i++) {
      const button = {
        isSelected: selectedParamIsArray ? selected.includes(i) : selected === i,
        isDisabled: disabledColorsParamIsArray ? disabledColors.includes(i) : disabledColors === i,
      };

      const stateIndex = button.isDisabled ? 2 : button.isSelected ? 1 : 0;
      const stateName = states[stateIndex];

      buttonArray.push(
        <ColorButton
          key={`color-${i}`}
          action={() => {
            if (button.isSelected) this.confirm(i);
            else this.change(i);
          }}
          disabled={button.isDisabled}
          type={`color-${i}` + appendClassName(stateName)}
        ></ColorButton>
      );
    }

    return buttonArray;
  }

  render() {
    const buttonArray = this.createButtonArray();
    return <section className={'ColorSelector' + appendClassName(this.props.type)}>{buttonArray}</section>;
  }
}
