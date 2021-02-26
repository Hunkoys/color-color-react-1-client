import { Component } from 'react';
import { appendClassName } from '../../common/functions';

export default class ListItem extends Component {
  render() {
    const child = <this.props.children.type {...this.props.children.props} reactKey={this.props.children.key} />;
    return (
      <li className={'ListItem' + appendClassName(this.props.type)} onClick={() => this.props.onSelect(child.props)}>
        {child}
      </li>
    );
  }
}

// // With Key passed as reactKey in props
// export default class ListItem extends Component {
//   render() {
//     const child = <this.props.children.type {...this.props.children.props} reactKey={this.props.children.key} />;
//     return (
//       <li className={'ListItem' + appendClassName(this.props.type)} onClick={() => this.props.onSelect(child.props)}>
//         {child}
//       </li>
//     );
//   }
// }
