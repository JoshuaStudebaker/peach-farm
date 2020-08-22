// Starting Variables
let peachesPicked = 0;
let bushelsPicked = 0;
let peachesSold = 0;
let pricePerPound_1s = 3.5;
let pricePerPound_2s = 1;
let pricePerPound_Wholesale = 1.5;
let bushelsPerTree = 2;
let trees = 1000;
let dog = "";
let farmerName = "";
let orchardName = "";
let cash = 10000;
let daysLeft_Winter = 60;
let daysLeft_Spring = 90;
let daysLeft_Summer = 100;
let winter = "Winter";
let spring = "Spring";
let summer = "Summer (aka the Harvest)";
let farmMods = 1;
let standMods = 1;
let cashOutflow = 0;

// Farm Items
let farmSecurity = [
  {
    name: "Ruskle the Farmdog",
    cost: 400,
    multiplier: 1,
    critterDamage: 100,
    requirement: 0,
    adds: 1,
  },
  {
    name: "Deputy Barkaroo",
    cost: 300,
    multiplier: 1,
    critterDamage: 80,
    requirement: 1,
    adds: 1,
  },
];

let farmEquipment = [
  {
    name: "The Old Tractor that Could",
    cost: 4000,
    multiplier: 30,
    bugDamage: 0,
    critterDamage: 0,
    requirement: 0,
    adds: 10,
  },
  {
    name: "The Hopefully-Not-Too-Leaky Sprayer",
    cost: 1000,
    multiplier: 0,
    bugDamage: 50,
    critterDamage: 0,
    requirement: 10,
    adds: 3,
  },
  {
    name: "Picking Trailer",
    cost: 800,
    multiplier: 30,
    bugDamage: 0,
    requirement: 10,
    adds: 4,
  },
];

let standInfrastructure = [{}];

let farmWorkers = [
  {
    name: "Farm Manager",
    pricePerDay: 0,
    multiplier: 25,
    experience: 2,
  },
  {
    name: "Kid",
    pricePerDay: 20,
    multiplier: 10,
    experience: 2,
  },
  {
    name: "High Schooler",
    pricePerDay: 60,
    multiplier: 8,
    experience: 0,
  },
  {
    name: "Go Getter",
    pricePerDay: 100,
    multiplier: 20,
    experience: 4,
  },
  {
    name: "Farm Legend",
    pricePerDay: 150,
    multiplier: 35,
    experience: 10,
  },
];

let standWorkers = [
  {
    name: "Stand Manager",
    pricePerDay: 0,
    multiplier: 5,
    experience: 0,
  },
  {
    name: "Retail Seller",
    pricePerDay: 75,
    multiplier: 10,
    experience: 0,
  },
  {
    name: "Boxer",
    pricePerDay: 80,
    multiplier: 15,
    experience: 0,
  },
];

// Display IDs
let bushelsDisplay = document.getElementById("bushel-count");
let daysLeftDisplay = document.getElementById("days-left");
let cashDisplay = document.getElementById("cash");
let farmWorkersDisplay = document.getElementById("farmWorkers");
let standWorkersDisplay = document.getElementById("standWorkers");
let farmEquipmentDisplay = document.getElementById("farmEquipment");
let farmSecurityDisplay = document.getElementById("farmSecurity");
let upgradeDisplay = document.getElementById("upgradeList");
let farmNameDisplay = document.getElementById("famName");

// Intervals
function dayCountSummer() {
  if (daysLeft_Summer > 0) {
    daysLeft_Summer--;
  } else {
    daysLeft_Summer = 0;
  }
  updateScreen();
}

function daysLeftSummer() {
  let days = setInterval(dayCountSummer, 1000);
}

function cashInterval() {
  let cash = setInterval(peachSelling, 2000);
}

// Game
function peachSelling() {
  if (bushelsPicked > 0) {
    bushelsPicked -= standMods;
    peachesSold = standMods;
    cash += peachesSold * pricePerPound_1s;
  }
  updateScreen();
}

function addFarmWorker(worker) {
  for (let i = 0; i < farmWorkers.length; i++) {
    let farmWorker = farmWorkers[i];
    if (farmWorker.name == worker) {
      farmMods += farmWorker.multiplier;
      cashOutflow += farmWorker.pricePerDay;
    }
  }
}

function addStandWorker(worker) {
  for (let i = 0; i < standWorkers.length; i++) {
    let standWorker = standWorkers[i];
    if (standWorker.name == worker) {
      standMods += standWorker.multiplier;
      cashOutflow += standWorker.pricePerDay;
    }
  }
}

function pick() {
  if (daysLeft_Summer < 100) {
    peachesPicked += farmMods;
    bushelsPicked = Math.ceil(peachesPicked / 4);
  }

  updateScreen();
}

function updateScreen() {
  bushelsDisplay.innerHTML = "Bushels Picked: " + bushelsPicked.toString();
  daysLeftDisplay.innerHTML = "Days Left: " + daysLeft_Summer.toString();
  cashDisplay.innerHTML = "Cash: $" + cash.toString();
}

// #region Draw Items:
//
// Farm Worker Draw
function drawFarmWorkers() {
  let template = "";
  farmWorkers.forEach((item) => {
    template += getFarmWorkerTemplate(item);
  });

  farmWorkersDisplay.innerHTML = template;
}

function getFarmWorkerTemplate(item) {
  return /*html*/ `
  <div class="border-for-card" type="button" onclick="addFarmWorker('${item.name}')"><p class="mb-0">
  ${item.name}: </p><p class="mb-0">Cost: ${item.pricePerDay} Productivity: ${item.multiplier}
  </p></div>
  `;
}

// Stand Worker Draw
function drawStandWorkers() {
  let template = "";
  standWorkers.forEach((item) => {
    template += getStandWorkerTemplate(item);
  });

  standWorkersDisplay.innerHTML = template;
}

function getStandWorkerTemplate(item) {
  return /*html*/ `
  <div class="border-for-card"><p> onclick="addStandWorker('${item.name}')">
  ${item.name}: Cost: ${item.pricePerDay} Productivity: ${item.multiplier}
  </p></div>
  `;
}

// Farm Equipment Draw
function drawFarmEquipment() {
  let template = "";
  farmEquipment.forEach((item) => {
    template += getFarmEquipmentTemplate(item);
  });

  farmEquipmentDisplay.innerHTML = template;
}

function getFarmEquipmentTemplate(item) {
  return /*html*/ `
  <div class="border-for-card"><p> onclick="addFarmEquipment('${item.name}')">
  ${item.name}: Cost: ${item.cost} Productivity: ${item.multiplier}
  </p></div>
  `;
}

// Farm Security Draw
function drawFarmSecurity() {
  let template = "";
  farmSecurity.forEach((item) => {
    template += getFarmSecurityTemplate(item);
  });

  farmSecurityDisplay.innerHTML = template;
}

function getFarmSecurityTemplate(item) {
  return /*html*/ `
  <div class="border-for-card"><p> onclick="addFarmSecurity('${item.name}')">
  ${item.name}: Cost: ${item.cost} Productivity: ${item.multiplier}
  </p></div>
  `;
}
// //#endregion

// #region All the Runners
drawFarmWorkers();
drawStandWorkers();
drawFarmEquipment();
drawFarmSecurity();
cashInterval();
drawFarmName();
// #endregion

// //#region Possible Expansion

// function drawPruningItems() {
//   let template = "";
//   pruningItems.forEach((item) => {
//     template += getPruningItemsTemplate(item);
//   });

//   PruningItemsDisplay.innerHTML = template;
// }

// function getPruningItemsTemplate(item) {
//   return /*html*/ `
//   <button onclick="addPruningItems('${item.name}')">
//     ${item.name}: Cost: ${item.price} Efficiency Bost: ${item.multiplier}
//   </button
//   `;
// }

// let PruningItemsDisplay = document.getElementById("pruningItems");

// drawPruningItems();

// function drawThinningItems() {
//   let template = "";
//   thinningItems.forEach((item) => {
//     template += getThinningItemsTemplate(item);
//   });

//   ThinningItemsDisplay.innerHTML = template;
// }

// function getThinningItemsTemplate(item) {
//   return /*html*/ `
//   <button onclick="addthinningItems('${item.name}')">
//     ${item.name}: Cost: ${item.price} Efficiency Bost: ${item.multiplier}
//   </button>
//   `;
// }

// let ThinningItemsDisplay = document.getElementById("thinningItems");

// drawThinningItems();

// let pruningItems = [
//   {
//     name: "Pruners",
//     price: 10,
//     quantity: 1,
//     multiplier: 5,
//     durability: 100,
//   },
//   {
//     name: "Mechanical Pruners",
//     price: 40,
//     quantity: 0,
//     multiplier: 8,
//     durability: 80,
//   },
//   {
//     name: "Extension Saw",
//     price: 120,
//     quantity: 0,
//     multiplier: 75,
//     durability: 150,
//   },
// ];
// let thinningItems = [
//   {
//     name: "By Hand",
//     price: 10,
//     quantity: 1,
//     multiplier: 5,
//     durability: 100,
//   },
//   {
//     name: "The Whacker",
//     price: 40,
//     quantity: 0,
//     multiplier: 8,
//     durability: 80,
//   },
//   {
//     name: "Thinning Machine",
//     price: 120,
//     quantity: 0,
//     multiplier: 75,
//     durability: 150,
//   },
// ];
// //#endregion
