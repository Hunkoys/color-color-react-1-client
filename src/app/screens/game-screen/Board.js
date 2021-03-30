import { Component } from 'react';
import Square from './board/Square';

export default class Board extends Component {
  render() {
    const data = this.props.data || {};
    const table = data.table || [];
    return (
      <div className="Board">
        {table.map((row, i) => (
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
