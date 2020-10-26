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
let antiqueIndex = Array(12);
let numRounds = 1;

function endMove(G, ctx, pid) {
  console.log(pid);
  if (pid >= 0 && pid < ctx.numPlayers) {
    console.log("b4 logic");

    if (!G.turnPlayed.includes(pid)) {
      G.turnPlayed.push(pid);
      console.log("b4 endTurn");
      ctx.events.endTurn({ next: pid.toString() });
      console.log("After Endturn");
    } else {
      console.log("Played the turn already");
    }
  } else return console.log("Please input vaild number");
}

function turnCheckStatus(G, ctx, id) {
  let aid = G.antiques[id].id;
  let name = G.antiques[id].name;
  let AntiqueStatus = checkStatus(G, ctx, id);
  //Should be returning the information to that player
  return alert(`ID: ${aid} \n Name: ${name} \n value: ${AntiqueStatus}`);
}

function alertAntiqueStatus(G, ctx, id) {
  let aid = G.antiques[id].id;
  let name = G.antiques[id].name;
  let AntiqueStatus = checkStatus(G, ctx, id);
  return alert(`ID: ${aid} \n Name: ${name} \n value: ${AntiqueStatus}`);
}

function personalSkill(G, ctx, playerID, skillTarget) {
  //let person = ctx.currentPlayer;
  let person = playerID;
  if (typeof G.playerRole[person].skill !== "undefined") {
    console.log("run Skill");
    let currentPlayer = G.playerRole[person].role_id;
    //update the skill inf
    switch (currentPlayer) {
      case 0:
        //second Check
        G.playerRole[person].skill(skillTarget);
        break;
      case 1:
      case 6:
        //attack/defend
        G = G.playerRole[person].skill(G, ctx, skillTarget);

        break;

      case 5:
        //flip
        if (skillTarget === true) {
          G = G.playerRole[person].skill(G, ctx, skillTarget);
        }
        break;
      case 2:
      case 3:
      case 4:
      case 7:
        console.log("No Skill");
        break;
      default:
        console.log("ERORR");
    }
  }
}

function PlayCard(G, ctx) {
  console.log("Played Cards");
}

export const AntiqueGame = {
  setup: (ctx) => ({
    antiques: antiquesData,
    playerRole: shuffledCharacterRole,
    checkStatus: {
      flipped: false
    },
    currentFourAntique: Array(4).fill(0),
    token: Array(ctx.numPlayers).fill(6),
    bidded: Array(0),
    turnPlayed: Array(0)
  }),

  phases: {
    setFourIndex: {
      moves: (G, ctx) => {
        let fourAntique = Array(4);
        let twoTrue = 0;
        let twoFalse = 0;

        while (twoFalse !== 2 && twoTrue !== 2) {
          let randomID = ctx.random.D12();
          let antiqueStatus = checkStatus(randomID);
          switch (antiqueStatus) {
            case true:
              if (checkStatus === true && twoTrue < 2) {
                fourAntique.push(randomID);
              }
              break;
            case false:
              if (checkStatus === false && twoFalse < 2) {
                fourAntique.push(randomID);
              }
              break;
            default:
              return "Something went wrong when selecting Antique";
          }
        }
        antiqueIndex = antiqueIndex.filter((el) => !fourAntique.indexOf(el));
        G.currentFourAntique = fourAntique;
        console.log("Round " + numRounds + ":");
      },
      start: true,
      endIf: (G, ctx) => G.fourAntique !== [0, 0, 0, 0],
      next: "checkPhases"
    },

    checkPhases: {
      moves: { PlayCard, turnCheckStatus, personalSkill, endMove },
      next: "buyPhase",
      endIf: (G, ctx) => ctx.turn === 8,
      turn: {
        order: {
          first: (G, ctx) => {
            let rand = ctx.random.Die(8) - 1;
            G.turnPlayed.push(rand);
            console.log("Setup :" + G.turnPlayed);
            return rand;
          }
          //playOrder: (G, ctx) => [-1]
        }
      }
    },

    buyPhase: {
      onBegin: (ctx) => {
        ctx.currentPlayer = "0";
      },

      moves: {
        bidding: {
          //bidList is a 2D array contains,
          // [0][0] is the Antique ID
          // [0][1] is the price of the Antique
          function(G, ctx, bidList) {
            let maxID = 0;
            let secondMaxID = 0;

            let maxToken = 0;
            let secondMaxToken = 0;

            for (let i = 0; i < 4; i++) {
              let antiqueID = bidList[i][0];
              let antiqueToken = bidList[i][1];

              if (antiqueToken > maxToken) {
                maxID = antiqueID;
              } else if (antiqueToken > secondMaxToken) {
                secondMaxID = antiqueID;
              } else if (antiqueToken === maxToken) {
                if (maxID > antiqueID) {
                  maxID = antiqueID;
                }
              } else if (antiqueToken === secondMaxToken) {
                if (secondMaxID > antiqueID) {
                  secondMaxID = antiqueID;
                }
              }
            }
            G.bidded.push(maxID, secondMaxID);
            alertAntiqueStatus(G, ctx, secondMaxID);
          }
        }
      },
      endIf: (G, ctx) => G.bidded.length === numRounds * 2,

      onEnd: (G, ctx) => {
        G.turnPlayed.length = 0;
        G.currentFourAntique = Array(4).fill(0);
      }
    },

    roundController: {
      endIf: (G, ctx) => {
        return { next: G.bidded.length === 6 ? "setFourIndex" : "votePhase" };
      }
    },

    votePhase: {
      turn: {
        activePlayers: {
          all: "protagonistVotingStage",
          value: (G, ctx) => {
            let antagonist = G.playerRole.GetPlayerByRole(5);
            let hitman = G.playerRole.GetPlayerByRole(6);
            let specialCase = {};
            specialCase[antagonist] = "antagonistVotingStage";
            specialCase[hitman] = "hitmanVotingStaging";
            return specialCase;
          }
        },
        stages: {
          protagonistVotingStage: {
            moves: {}
          }
        },
        antagonistVotingStage: {
          moves: {
            function(G, ctx) {}
          }
        },
        hitmanVotingStage: {
          moves: {
            function(G, ctx) {}
          }
        }
      }
    }
  },

  minPlayers: 6,
  maxPlayers: 8
};
