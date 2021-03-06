import { checkStatus } from "./antiquesData.js";

// 0-Protagonist, 1- Bodyguard, 2-Overseer, 3&4 - Normal, 5- Antagonist, 6- Hitman, 7- Undercover
const characterRole = [
  {
    //Done!?
    //Protagonist: Hv Skill, no disable, can be attack
    role_id: 0,
    player_id: -1,
    name: "Protaganist",
    skill: function (G, ctx, targetID) {
      console.log("Protagonist Skill Called");
      return checkStatus(targetID);
    },
    attacked_flag: false,
    protected_flag: false
  },
  {
    //Done!?
    //Bodyguard: Hv Skill, no check (checkdisalbe = true), can be attack
    role_id: 1,
    player_id: -1,
    name: "Bodyguard",
    skill: function (G, ctx, targetPlayerID) {
      console.log("Skill Called");
      const characters = G.playerRole;
      console.log("const created");
      let role_id = GetRoleByPlayer(characters, targetPlayerID);
      console.log("Role id: " + role_id);
      characters[role_id].protected_flag = true;
      G.playerRole = characters;
      return G;
    },
    checkDisable: true,
    attacked_flag: false,
    protected_flag: false
  },
  {
    //Overseer: Passive Skill (lost after attacked), no disable, can be attack
    role_id: 2,
    player_id: -1,
    name: "Overseer",
    //skill: SkillOverseer,
    skill: null,
    attacked_flag: false,
    protected_flag: false
  },
  {
    role_id: 3,
    player_id: -1,
    name: "Normal-One",
    skill: null,
    attacked_flag: false,
    failed_flag: false,
    protected_flag: false
  },
  {
    role_id: 4,
    player_id: -1,
    name: "Normal-Two",
    skill: null,
    attacked_flag: false,
    failed_flag: false,
    protected_flag: false
  },
  {
    role_id: 5,
    player_id: -1,
    name: "Antagonist",
    skill: function (G, ctx, flipping) {
      G.checkStatus.flipped = "true";
    },
    attacked_flag: false,
    protected_flag: false
  },
  {
    role_id: 6,
    player_id: -1,
    name: "Hitman",
    skill: function (G, ctx, targetPlayerID) {
      console.log("Attack Skill Called");
      const characters = G.playerRole;
      console.log("const created");
      let role_id = GetRoleByPlayer(characters, targetPlayerID);
      console.log("Role id: " + role_id);
      characters[role_id].attacked_flag = true;
      G.playerRole = characters;
      return G;
    },
    attacked_flag: false,
    protected_flag: false
  },
  {
    role_id: 7,
    player_id: -1,
    name: "Undercover",
    //skill: SkillUnderCover,
    attacked_flag: false,
    protected_flag: false
  }
];

function ShufflePlayer(charcterRole, n) {
  let shuffledPlayer = characterRole;
  //read the number of player, then shuffle, for tesing [8]
  let arr = [...Array(n).keys()];
  var currentIndex = arr.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }
  for (let i = 0; i < 8; i++) {
    shuffledPlayer[i].player_id = arr[i];
  }
  return shuffledPlayer;
}

/*function SetPlayerToRole(role_id, player_id) {
  characterRole[role_id].player_id = player_id;
}*/

function GetPlayerByRole(role_id) {
  characterRole.forEach((character) => {
    if (character.role_id === role_id) {
      return character.player_id;
    }
  });
}

function GetRoleByPlayer(characters, player_id) {
  for (var i = 0; i < characters.length; i++) {
    if (characters[i].player_id === player_id) {
      return characters[i].role_id;
    }
  }
}

export const shuffledCharacterRole = ShufflePlayer(characterRole, 8);
