import { Component } from 'react';
import Square from './board/Square';

export default class Board extends Component {
  render() {
    const colorTable = this.props.colorTable || [];
    const highlightedSquares = this.props.highlight ? this.props.highlight.squares.all : [];
    return (
      <div className="Board">
        {colorTable.map((row, y) => (
          <div key={`row${y}`} className={`board row`}>
            {row.map((colorIndex, x) => {
              const isGlow = highlightedSquares.some(([xOwned, yOwned]) => {
                return xOwned === x && yOwned === y;
              });

              return <Square color={`board color-${colorIndex}`} glow={isGlow} key={`square-${x}`}></Square>;
            })}
          </div>
        ))}
      </div>
    );
  }
}
