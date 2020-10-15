import {antiquesData} from './antiquesData.js'


/*
function SetAntique(antiquesData){
  antiquesData = this.antiquesData;
}

function GetAntique(){
  return antiques
}
*/

export const AntiqueGame = {
  setup: ( => ({
    antiques: antiquesData,
  }),

  moves: {
    clickCell: (G, ctx, id) => {
      G.antiques[id] = G.antiques[id+1];
    },
  },

};
