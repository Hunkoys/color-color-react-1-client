import { Component, Fragment } from 'react';
import Pit from '../../generic-components/Pit';
import List from '../../generic-components/List';
import { appendClassName } from '../../common/functions';
import Spacer from '../../generic-components/Spacer';
export default class ListPit extends Component {
  render() {
    const items = this.props.children || [];
    return (
      <Pit type={'ListPit' + appendClassName(this.props.type)}>
        <List select={this.props.select} placeholder={this.props.placeholder}>
          {items}
        </List>
      </Pit>
    );
  }
}
