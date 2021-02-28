import { Component } from 'react';
import { appendClassName } from '../common/functions';

// Currently unsafe

class ListItem extends Component {
  render() {
    const children = this.props.children;
    return (
      <li
        className={
          'ListItem' + appendClassName(this.props.type) + appendClassName(this.props.selected ? 'selected' : '')
        }
        onClick={() => this.props.onSelect(children)}
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
    this.state = {};
  }

  select(item) {
    this.setState((state) => {
      const alreadySelected = state.selectedKey === item.key;

      if (alreadySelected)
        return {
          selectedKey: null,
        };
      else
        return {
          selectedKey: item.key,
        };
    });

    this.props.select(item.props.value);
  }

  render() {
    const { children } = this.props;
    const items = children instanceof Array ? children : [];
    return (
      <ul className={'List' + appendClassName(this.props.type)}>
        {items.length
          ? items.map((item) => {
              const selected = this.state.selectedKey === item.key;

              return (
                <ListItem selected={selected} key={item.key} onSelect={(self) => this.select(self)}>
                  {item}
                </ListItem>
              );
            })
          : this.props.placeholder}
      </ul>
    );
  }
}

{
  /* <item.type {...item.props} {...{ onClick: () => this.props.select(item) }} /> */
}
