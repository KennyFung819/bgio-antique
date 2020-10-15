const antiquesOrigin = [
  {
    id:0,
    name:"Rat",
    vaild:true
  },
  {
    id:1,
    name:"Cow",
    vaild:true
  },
  {
    id:2,
    name:"Tiger",
    vaild:true
  },
  {
    id:3,
    name:"Rabbit",
    vaild:true
  },
  {
    id:4,
    name:"Dragon",
    vaild:true
  },
  {
    id:5,
    name:"Snake",
    vaild:true
  },
  {
    id:6,
    name:"Horse",
    vaild:true
  },
  {
    id:7,
    name:"Sheep",
    vaild:true
  },
  {
    id:8,
    name:"Monkey",
    vaild:true
  },
  {
    id:9,
    name:"Chicken",
    vaild:true
  },
  {
    id:10,
    name:"Dog",
    vaild:true
  },
  {
    id:11,
    name:"Pig",
    vaild:true
  },
];
export const antiquesData = ForgeSixAntique(antiquesOrigin);

function ForgedAntique(antique){
  antique.vaild = false;
  return antique;
}

function rollRandom(){
  const rn = Math.floor(Math.random()*Math.floor(12));
  console.log("RNG: "+rn);
  return rn;
}

function ForgeSixAntique(antiquesData){
  const forgeList = [];
  while (forgeList.length<6){
    forgeList.push(rollRandom());
    console.log("forgeList Length:" + forgeList.length)
  }
  forgeList.forEach((item, i) => {
    antiquesData[item] = ForgedAntique(antiquesData[item])
  });
  console.log("Forged");
  return antiquesData;
}
