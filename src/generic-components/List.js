import { Component } from 'react';
import { appendClassName } from '../common/functions';

// Currently unsafe

class ListItem extends Component {
  render() {
    const children = this.props.children;
    return (
      <li
        className={'ListItem' + appendClassName(this.props.type)}
        onClick={() => this.props.onSelect(children.props.value)}
      >
        {children}
      </li>
    );
  }

  // // With Key passed as reactKey in props made possible by: cloning
  //  render() {
  //     const child = <this.props.children.type {...this.props.children.props} reactKey={this.props.children.key} />;
  //     return (
  //       <li className={'ListItem' + appendClassName(this.props.type)} onClick={() => this.props.onSelect(child.props)}>
  //         {child}
  //       </li>
  //     );
  //   }
}

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

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
