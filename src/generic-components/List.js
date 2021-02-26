import { Component, Fragment } from 'react';
import { appendClassName } from '../common/functions';
import ListItem from './list/ListItem';
import Spacer from './Spacer';

// Currently unsafe

export default class List extends Component {
  select(item) {
    this.props.select(item);
  }

  render() {
    const items = this.props.children || [];
    return (
      <ul className={'List' + appendClassName(this.props.type)}>
        {items.length
          ? items.map((item) => {
              return <ListItem onSelect={(item) => this.select(item)}>{item}</ListItem>;
            })
          : this.props.placeholder}
      </ul>
    );
  }
}

{
  /* <item.type {...item.props} {...{ onClick: () => this.props.select(item) }} /> */
}
