import { antiquesData } from "./antiquesData.js";
import { checkStatus } from "./antiquesData.js";
import { shuffledCharacterRole } from "./character.js";
/*
function SetAntique(antiquesData){
  antiquesData = this.antiquesData;
}

function GetAntique(){
  return antiques
}
*/

function skillController(playerID) {}

export const AntiqueGame = {
  setup: () => ({
    antiques: antiquesData,
    playerRole: shuffledCharacterRole,
    checkStatus: {
      flipped: false
    }
  }),

  moves: {
    checkStatus: (G, ctx, id) => {
      let aid = G.antiques[id].id;
      let name = G.antiques[id].name;
      let AntiqueStatus = checkStatus(G, ctx, id);
      return alert(`ID: ${aid} \n Name: ${name} \n value: ${AntiqueStatus}`);
    },

    personalSkill: (G, ctx, playerID, skillTarget) => {
      //let person = ctx.currentPlayer;
      let person = playerID;
      if (typeof G.playerRole[person].skill !== "undefined") {
        console.log("run Skill");
        //update the skill inf
        G = G.playerRole[person].skill(G, ctx, skillTarget);
      }
    }
  }
};
