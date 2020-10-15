const { Server } = require('boardgame.io/server');
const { AntiqueGame } = require('src/antique/Game');

const server = Server({ games: [AntiqueGame] });

server.run(5000);
