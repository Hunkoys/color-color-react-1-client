import { Component } from 'react';
import Square from './board/Square';

export default class Board extends Component {
  render() {
    return (
      <div className="Board">
        {this.props.table.map((row, i) => (
          <div key={`row${i}`} className={`board row`}>
            {row.map((colorIndex, i) => (
              <Square color={`board color${colorIndex}`} key={`square${i}`}></Square>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
