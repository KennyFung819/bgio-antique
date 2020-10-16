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
        let currentPlayer = G.playerRole[person].role_id;
        //update the skill inf
        switch (currentPlayer) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
            break;
          default:
            console.log("ERORR");
        }
        G = G.playerRole[person].skill(G, ctx, skillTarget);
      }
    }
  }
};
