import { Component } from 'react';
import Square from './board/Square';

export default class Board extends Component {
  render() {
    const colorTable = this.props.colorTable || [];
    return (
      <div className="Board">
        {colorTable.map((row, i) => (
          <div key={`row${i}`} className={`board row`}>
            {row.map((colorIndex, i) => (
              <Square color={`board color-${colorIndex}`} key={`square-${i}`}></Square>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
