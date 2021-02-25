import { Component, Fragment } from 'react';
import Pit from '../../generic-components/Pit';
import List, { ListItem } from '../../generic-components/List';
import { appendClassName } from '../../common/functions';
import Spacer from '../../generic-components/Spacer';

export default class ListPit extends Component {
  render() {
    const items = this.props.children || [];
    return (
      <Pit type={'ListPit' + appendClassName(this.props.type)}>
        <List>
          {items.length
            ? items.map((item, index) => (
                <Fragment key={`LisPitItem${index}`}>
                  {index ? <Spacer type="space-between-items" /> : null}
                  <ListItem>{item}</ListItem>
                </Fragment>
              ))
            : this.props.placeholder}
        </List>
      </Pit>
    );
  }
}
