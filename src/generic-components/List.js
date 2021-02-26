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
          ? items.map((item, index) => {
              return (
                <Fragment key={`LisPitItem${index}`}>
                  {index ? <Spacer type="space-between-items" /> : null}
                  <ListItem>{item}</ListItem>
                </Fragment>
              );
            })
          : this.props.placeholder}
      </ul>
    );
  }
}
