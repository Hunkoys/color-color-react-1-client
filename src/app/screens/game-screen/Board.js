import { Component } from 'react';
import Square from './board/Square';

export default class Board extends Component {
  render() {
    const colorTable = this.props.colorTable || [];
    const glow = this.props.glow || [];
    return (
      <div className="Board">
        {colorTable.map((row, y) => (
          <div key={`row${y}`} className={`board row`}>
            {row.map((colorIndex, x) => {
              const isGlow = glow.some((owned) => {
                return owned[0] === x && owned[1] === y;
              });

              return <Square color={`board color-${colorIndex}`} glow={isGlow} key={`square-${x}`}></Square>;
            })}
          </div>
        ))}
      </div>
    );
  }
}
