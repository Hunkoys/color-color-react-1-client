import { Component, Fragment } from 'react';
import { appendClassName } from '../common/functions';
import ListItem from './list/ListItem';
import Spacer from './Spacer';

// Currently unsafe

export default class List extends Component {
  render() {
    const items = this.props.children || [];
    return (
      <ul className={'List' + appendClassName(this.props.type)}>
        {items.length
          ? items.map((item) => {
              return <item.type {...item.props} {...{ onClick: () => this.props.select(item.props.children) }} />;
            })
          : this.props.placeholder}
      </ul>
    );
  }
}
