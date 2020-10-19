import React from "react";

export class AntiqueBoard extends React.Component {
  onClick(id) {
    this.props.moves.clickCell(id);
  }

  render() {
    let winner = "";
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
        ) : (
          <div id="winner">Draw!</div>
        );
    }

    const cellStyle = {
      border: "1px solid #555",
      width: "50px",
      height: "50px",
      lineHeight: "50px",
      textAlign: "center"
    };

    let tbody = [];
    for (let i = 0; i < 3; i++) {
      let cells = [];
      for (let j = 0; j < 3; j++) {
        const id = 3 * i + j;
      }
    }

    return (
      <div>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
        {winner}
      </div>
    );
  }
}
