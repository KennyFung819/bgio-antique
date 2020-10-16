import React from "react";
import { Client } from "boardgame.io/react";
import { AntiqueGame } from "./Game";

const App = Client({
  game: AntiqueGame,
  numPlayers: 8
});

export default App;
