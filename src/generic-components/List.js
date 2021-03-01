import { Component, Fragment } from 'react';
import { appendClassName } from '../common/functions';

// Currently unsafe

class ListItem extends Component {
  render() {
    const children = this.props.children;
    const selected = this.props.selected ? 'selected' : '';

    return (
      <li
        className={'ListItem' + appendClassName(this.props.type) + appendClassName(selected)}
        onClick={() => this.props.onPress(children)}
      >
        {<children.type {...children.props} type={appendClassName(selected)} />}
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
      selectedKey: null,
    };
  }

  onSelect(item) {
    this.default(item);
  }

  default(item) {
    this.setState((state) => {
      const alreadySelected = this.compare(state, item);

      if (alreadySelected) return this.deselect();
      else return this.select(item);
    });
  }

  compare(state, item) {
    if (!item && !item.key) return false;
    return state.selectedKey === item.key;
  }

  select(item) {
    const itemIsString = typeof item === 'string';
    const value = itemIsString ? item : item.props.value || '';

    this.sendToParent(value);

    if (!itemIsString && item.props.value === undefined) {
      console.warn(`List: one or more of List's items may not have a value prop`);
    }

    return {
      selectedKey: item.key,
    };
  }

  deselect() {
    const value = null;
    this.sendToParent(value);

    return {
      selectedKey: null,
    };
  }

  sendToParent(value) {
    if (this.props.select) this.props.select(value);
  }

  render() {
    const { children } = this.props;
    const items = children instanceof Array ? children : [];
    return (
      <ul className={'List' + appendClassName(this.props.type)}>
        {items.length
          ? items.map((item) => {
              const selected = this.compare(this.state, item);

              return (
                <ListItem selected={selected} key={item.key} onPress={(self) => this.onSelect(self)}>
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
