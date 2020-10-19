import { antiquesData } from "./antiquesData.js";
import { checkStatus } from "./antiquesData.js";
import { shuffledCharacterRole } from "./character.js";
import { TurnOrder } from "boardgame.io/core";
import { waitForElementToBeRemoved } from "@testing-library/react";

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
let turnPlayed = Array(8);

function endMove(G, ctx, pid) {
  if (!turnPlayed.includes(pid)) {
    ctx.events.endTurn({ next: pid });
  } else endMove(G, ctx, pid);
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
    bidden: Array(0)
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
      next: "BuyPhase"
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

      /*turn: {
        activePlayers: { all: "biddingStage" },
        stages: {
          biddingStage: {
            moves: {
              function(G, ctx) {
                let minBid = 0;
                let maxBid = 2*numRounds;

              }
            }
          }
        }
      }
      ,*/

      endIf: (G, ctx) => {
        return { next: G.bidded.length === 6 ? "setFourIndex" : "votePhase" };
      },

      onEnd: (G, ctx) => {
        G.currentFourAntique = Array(4).fill(0);
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
