import { Component } from 'react';
import { faces } from '../../common/classes';
import { appendClassName } from '../../common/functions';

class GridRow extends Component {
  render() {
    return <section className={GridRow.name + appendClassName(this.props.type)}>{this.props.children}</section>;
  }
}

class GridItem extends Component {
  render() {
    return (
      <section
        className={GridItem.name + appendClassName(this.props.type)}
        onClick={() => {
          this.props.onClick([this.props.code, this.props.children]);
        }}
      >
        {this.props.children}
      </section>
    );
  }
}

class ShowBox extends Component {
  render() {
    const { onClick = () => {} } = this.props;
    return (
      <section className={ShowBox.name + appendClassName(this.props.type)} onClick={onClick}>
        {this.props.children}
      </section>
    );
  }
}

export default class GridSelector extends Component {
  constructor(props) {
    super(props);
    const { children = [], hook, defaultValue = 0 } = props;
    const firstFaceName = Object.entries(children)[defaultValue][0];
    const [faceName = firstFaceName] = hook;
    this.state = {
      selectorOpen: false,
      faceName,
    };
  }

  onClickItem = (item) => {
    console.log('clicked', item.value);
    const { hook = [] } = this.props;
    const [face, setFace = () => {}] = hook;
    this.setState({ selectorOpen: false, item });
    setFace(item);
  };

  showBoxClick = () => {
    this.setState(({ selectorOpen }) => {
      return {
        selectorOpen: !selectorOpen,
      };
    });
  };

  render() {
    const { rowSize = 1, children = {}, hook = [] } = this.props;
    const [face, setFace = () => {}] = hook;

    const items = Object.entries(children);
    const grid = [];
    let row = [];
    for (let i = 0; i < items.length; i++) {
      const [key, value] = items[i];
      const griditem = (
        <GridItem key={key} code={key} onClick={this.onClickItem}>
          {value}
        </GridItem>
      );
      row.push(griditem);
      if (i % rowSize < 4) continue;
      grid.push(<GridRow key={`row-${i}`}>{row}</GridRow>);
      row = [];
    }

    const [value] = faces[this.state.faceName]; // if cookie is empty, this breaks

    return (
      <article className={GridSelector.name + appendClassName(this.props.type)}>
        <ShowBox onClick={this.showBoxClick}>{value}</ShowBox>
        {this.state.selectorOpen ? <section className="grid">{grid}</section> : null}
      </article>
    );
  }
}

// popUp:
