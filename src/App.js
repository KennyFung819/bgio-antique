import { Client } from 'boardgame.io/react';
import { AntiqueGame } from './Game';

const App = Client({
  game: AntiqueGame,
  numPlayer: 8
});

export default App;
