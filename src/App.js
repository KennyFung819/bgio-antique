import React from "react";
import { Client } from "boardgame.io/react";
import { AntiqueGame } from "./Game";
import { AntiqueBoard } from "./Board";

const App = Client({
  game: AntiqueGame,
  board: AntiqueBoard,
  numPlayers: 8
});

export default App;
