// Starting Variables
let peachesPicked = 0;
let peachesInCooler = 0;
let peachesSold = 0;
let pricePerPound_1s = 4;
let pricePerPound_Wholesale = 1.5;
let cash = 10000;
let daysLeft_Summer = 100;
let farmMods = 1;
let standMods = 1;
let cashOut = 0;
let cashIn = 0;
let farmWorkersHired = [];
let standWorkersHired = [];

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
    name: "Grandad",
    pricePerDay: 0,
    multiplier: 5,
    experience: 0,
  },
  {
    name: "Toots and Boots (Yes, you have kids)",
    pricePerDay: 0,
    multiplier: 10,
    experience: 0,
  },
  {
    name: "Space Case",
    pricePerDay: 60,
    multiplier: 5,
    experience: 0,
  },
  {
    name: "Mrs. Olott",
    pricePerDay: 70,
    multiplier: 7,
    experience: 0,
  },
  {
    name: "Noah Schoow",
    pricePerDay: 50,
    multiplier: 4,
    experience: 0,
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
let farmWorkersHiredDisplay = document.getElementById("farmWorkersHired");
let farmNameDisplay = document.getElementById("famName");
let bushelsSoldDisplay = document.getElementById("bushels-sold");
let bushelsInStorageDisplay = document.getElementById("bushels-in-storage");
let cashOutDisplay = document.getElementById("cash-out");
let cashInDisplay = document.getElementById("cash-in");

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
  setInterval(dayCountSummer, 2000);
}

function pause() {
  clearInterval(daysLeft_Summer);
}

function cashInterval() {
  let cash = setInterval(cashInAndOut, 2000);
}

// Game
function peachSelling() {
  if (peachesInCooler > 0) {
    peachesInCooler -= standMods;
    peachesSold = standMods;
    cashIn = peachesSold * pricePerPound_1s;
    cash += cashIn;
  }
  updateScreen();
}

function cashOutflow() {
  if (cash > 0) {
    cash -= cashOut;
  }
}

function cashInAndOut() {
  peachSelling();
  cashOutflow();
}

function fireFarmWorker(worker) {
  for (let i = 0; i < farmWorkersHired.length; i++) {
    let farmWorkerFired = farmWorkersHired[i];
    if (farmWorkerFired.name == worker) {
      farmMods -= farmWorkerFired.multiplier;
      cashOut -= farmWorkerFired.pricePerDay;
      farmWorkersHired.splice(i, 1);
      farmWorkers.push(farmWorkerFired);
      drawFarmWorkers();
      drawFarmWorkersHired();
    }
  }
}

function addFarmWorker(worker) {
  for (let i = 0; i < farmWorkers.length; i++) {
    let farmWorker = farmWorkers[i];
    if (farmWorker.name == worker) {
      farmMods += farmWorker.multiplier;
      cashOut += farmWorker.pricePerDay;
      farmWorkers.splice(i, 1);
      farmWorkersHired.push(farmWorker);
      drawFarmWorkers();
      drawFarmWorkersHired();
    }
  }
}

function addStandWorker(worker) {
  for (let i = 0; i < standWorkers.length; i++) {
    let standWorker = standWorkers[i];
    if (standWorker.name == worker) {
      standMods += standWorker.multiplier;
      cashOut += standWorker.pricePerDay;
    }
  }
}

function pick() {
  if (daysLeft_Summer < 100) {
    peachesPicked += farmMods;
    peachesInCooler += farmMods;
    // bushelsPicked = Math.ceil(peachesPicked / 4);
  }

  updateScreen();
}

function updateScreen() {
  bushelsDisplay.innerHTML = "Peaches Picked: " + peachesPicked.toString();
  daysLeftDisplay.innerHTML = "Days Left: " + daysLeft_Summer.toString();
  cashDisplay.innerHTML = "Cash: $" + cash.toString();
  cashInDisplay.innerHTML = "Inflow: $" + cashIn.toString();
  cashOutDisplay.innerHTML = "Wage Load: $" + cashOut.toString();
  bushelsInStorageDisplay.innerHTML =
    "Peaches in Cooler: " + peachesInCooler.toString();
  bushelsSoldDisplay.innerHTML = "Peaches Sold: " + peachesSold.toString();
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
  <div class="border-for-card" type="button" onclick="addFarmWorker('${item.name}')"><p class="mb-0 pl-1"><u>
  ${item.name}</u>:</p><p class="mb-0 text-right pr-1">$${item.pricePerDay}/day, Productivity: ${item.multiplier}</p>
  </div>
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
  <div class="border-for-card" type="button" onclick="addStandWorker('${item.name}')"><p class="mb-0 pl-1"><u>
  ${item.name}</u>:</p><p class="mb-0 text-right pr-1">$${item.pricePerDay}/day, Retail Boost+: ${item.multiplier}</p>
  </div>
  `;
}

// Hired Farm Worker Draw
function drawFarmWorkersHired() {
  let template = "";
  farmWorkersHired.forEach((item) => {
    template += getFarmWorkersHiredTemplate(item);
  });

  farmWorkersHiredDisplay.innerHTML = template;
}

function getFarmWorkersHiredTemplate(item) {
  return /*html*/ `
  <div class="border-for-card"><p class="mb-0 pl-1"><u>
  ${item.name}</u>:</p><p class="mb-0 text-right pr-1">$${item.pricePerDay}/day, Productivity: ${item.multiplier}</p><button type="button" class="btn" onclick="fireFarmWorker('${item.name}')")>Fire</button>
  </div>
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
