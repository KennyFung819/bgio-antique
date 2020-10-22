import React from "react";
import { Client } from "boardgame.io/react";
import { AntiqueGame } from "./Game";
import { AntiqueBoard } from "./Board";
import { SocketIO } from "boardgame.io/multiplayer";
import { render } from "react-dom";

const AntiqueClient = Client({
  game: AntiqueGame,
  board: AntiqueBoard,
  numPlayers: 8
  //multiplayer: SocketIO({ server: 'localhost:8000' }),
});

class App extends React.Component {
  state = { playerID: null };

  render() {
    const playerChoice = [];
    for (let i = 0; i < 8; i++) {
      let numString = i.toString();
      playerChoice.push(
        <button onClick={() => this.setState({ playerID: numString })}>
          Character {i}
        </button>
      );
    }
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          {playerChoice}
        </div>
      );
    }
    return (
      <div>
        <AntiqueClient playerID={this.state.playerID} />
      </div>
    );
  }
}

export default App;
