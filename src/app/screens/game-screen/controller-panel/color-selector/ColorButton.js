import { Component } from 'react';
import { appendClassName } from '../../../../../common/functions';
import Clickable from '../../../../../generic-components/Clickable';

export default class ColorButton extends Component {
  render() {
    return (
      <Clickable {...this.props} type={'ColorButton' + appendClassName(this.props.type)}>
        {this.props.children}
      </Clickable>
    );
  }
}

// Remove:
//    action = this.props.action || (() => { });
