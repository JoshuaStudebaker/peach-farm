// #region Starting Variables
let harvest = 0;
let peachesPicked = 0;
let peachesInCooler = 0;
let peachesSold = 0;
let pricePerPound = 0.5;
let cash = 0;
let farmMods = 1;
let standMods = 0;
let cashOut = 0;
let cashInAuto = 0;
let cashInButton = 0;
let dailyRetail = cashInAuto;
let farmWorkersHired = [];
let standWorkersHired = [];
let farmEquipmentBought = [];
let standInfrastructureBought = [];
// #endregion

// #region Start and Restart
function beginHarvest() {
  harvest = 1;
  let template = "";
  harvestDisplay.innerHTML = template;
}

function restart() {
  harvest = 0;
  peachesPicked = 0;
  peachesInCooler = 0;
  peachesSold = 0;
  pricePerPound = 0.5;
  cash = 0;
  farmMods = 1;
  standMods = 0;
  cashOut = 0;
  cashInAuto = 0;
  // cashInButton = 0;
  dailyRetail = cashInAuto;
  farmWorkersHired = [];
  standWorkersHired = [];
  farmEquipmentBought = [];
  standInfrastructureBought = [];

  farmEquipment = [
    {
      name: "Tractor",
      cost: 4000,
      multiplier: 30,
    },
    {
      name: "Picking Trailer",
      cost: 800,
      multiplier: 30,
    },
  ];

  standInfrastructure = [
    {
      name: "Cooler",
      cost: 2000,
      betterPrice: 1,
    },
    {
      name: "Ice Cream Machine",
      cost: 1200,
      betterPrice: 0.5,
    },
  ];

  farmWorkers = [
    {
      name: "Grandad",
      pricePerDay: 0,
      multiplier: 3,
    },
    {
      name: "Jr (Your Kid)",
      pricePerDay: 0,
      multiplier: 5,
    },
    {
      name: "Orchard Picker",
      pricePerDay: 60,
      multiplier: 20,
    },
  ];

  standWorkers = [
    {
      name: "Stand Manager",
      pricePerDay: 100,
      multiplier: 75,
    },
    {
      name: "Retail Seller",
      pricePerDay: 50,
      multiplier: 30,
    },
  ];

  updateScreen();
  let template =
    '<button type="button" class="btn start-buttons rounded" onclick="beginHarvest()">Begin Harvest</button>';
  harvestDisplay.innerHTML = template;
}
// #endregion

// #region Display Items
let peachesDisplay = document.getElementById("peach-count");
let cashDisplay = document.getElementById("cash");
let farmWorkersDisplay = document.getElementById("farmWorkers");
let standWorkersDisplay = document.getElementById("standWorkers");
let farmEquipmentDisplay = document.getElementById("farmEquipment");
let farmSecurityDisplay = document.getElementById("farmSecurity");
let farmWorkersHiredDisplay = document.getElementById("farmWorkersHired");
let standWorkersHiredDisplay = document.getElementById("standWorkersHired");
let farmNameDisplay = document.getElementById("famName");
let peachesSoldDisplay = document.getElementById("peaches-sold");
let peachesInStorageDisplay = document.getElementById("peaches-in-storage");
let cashOutDisplay = document.getElementById("cash-out");
let cashInDisplay = document.getElementById("cash-in-daily");
let pricePerPoundDisplay = document.getElementById("price-per-pound");
let standInfrastructureDisplay = document.getElementById("standInfrastructure");
let harvestBoostDisplay = document.getElementById("harvest-boost");
let retailBoostDisplay = document.getElementById("retail-boost");
let harvestDisplay = document.getElementById("harvest");
// #endregion

// #region Items + Workers;
let farmEquipment = [
  {
    name: "Tractor",
    cost: 4000,
    multiplier: 30,
  },
  {
    name: "Picking Trailer",
    cost: 800,
    multiplier: 30,
  },
];

let standInfrastructure = [
  {
    name: "Cooler",
    cost: 2000,
    betterPrice: 1,
  },
  {
    name: "Ice Cream Machine",
    cost: 1200,
    betterPrice: 0.5,
  },
];

let farmWorkers = [
  {
    name: "Grandad",
    pricePerDay: 0,
    multiplier: 3,
  },
  {
    name: "Jr (Your Kid)",
    pricePerDay: 0,
    multiplier: 5,
  },
  {
    name: "Orchard Picker",
    pricePerDay: 60,
    multiplier: 20,
  },
];

let standWorkers = [
  {
    name: "Stand Manager",
    pricePerDay: 100,
    multiplier: 75,
  },
  {
    name: "Retail Seller",
    pricePerDay: 50,
    multiplier: 30,
  },
];
// #endregion

// #region Intervals
function cashInterval() {
  setInterval(cashDaily, 2000);
  updateScreen();
  // cashInButton = 0;
}
// #endregion

// #region Buttons and Cash Flow
function pick() {
  if (harvest == 1) {
    peachesPicked += farmMods;
    peachesInCooler += farmMods;
  }
  updateScreen();
}

function peachAutoSelling() {
  if (peachesInCooler >= standMods) {
    peachesInCooler -= standMods;
    peachesSold += standMods;
    cashInAuto = 24 * standMods * pricePerPound;
    cash += cashInAuto;
  } else if (peachesInCooler > 0 && standMods > 0) {
    peachesSold += peachesInCooler;
    cashInAuto = 24 * peachesInCooler * pricePerPound;
    cash += cashInAuto;
    peachesInCooler = 0;
  }
  updateScreen();
}

function sell() {
  if (harvest == 1) {
    if (peachesInCooler > 0) {
      let cashInButton = 24 * pricePerPound;
      cash += cashInButton;
      peachesSold++;
      peachesInCooler--;
    }
  }
  updateScreen();
}

function drawDailyRetail() {
  dailyRetail = cashInAuto;
  updateScreen();
}

function cashOutflow() {
  cash -= cashOut;
  updateScreen();
}

function cashDaily() {
  // sell();
  peachAutoSelling();
  drawDailyRetail();
  cashOutflow();
  updateScreen();
}

function addFarmWorker(worker) {
  for (let i = 0; i < farmWorkers.length; i++) {
    let farmWorker = farmWorkers[i];
    if (farmWorker.name == worker) {
      farmMods += farmWorker.multiplier;
      cashOut += farmWorker.pricePerDay;
      if (farmWorker.name != "Orchard Picker") {
        farmWorkers.splice(i, 1);
      }
      farmWorkersHired.push(farmWorker);
    }
  }
  updateScreen();
}

function addStandWorker(worker) {
  for (let i = 0; i < standWorkers.length; i++) {
    let standWorker = standWorkers[i];
    if (standWorker.name == worker) {
      standMods += standWorker.multiplier;
      cashOut += standWorker.pricePerDay;
      standWorkers.splice(i, 1);
      standWorkersHired.push(standWorker);
    }
  }
}

function addFarmEquipment(implement) {
  for (let i = 0; i < farmEquipment.length; i++) {
    let equipment = farmEquipment[i];
    if (equipment.name == implement && equipment.cost <= cash) {
      farmMods += equipment.multiplier;
      cash -= equipment.cost;
      equipment.multiplier = Math.floor(equipment.multiplier * 1.25);
      equipment.cost = Math.floor(equipment.cost * 1.2);
    }
  }
  updateScreen();
}

function addStandInfrastructure(implement) {
  for (let i = 0; i < standInfrastructure.length; i++) {
    let purchase = standInfrastructure[i];
    if (purchase.name == implement && purchase.cost <= cash) {
      farmMods += purchase.multiplier;
      cash -= purchase.cost;
      purchase.multiplier = Math.floor(purchase.betterPrice * 1.25);
      purchase.cost = Math.floor(purchase.cost * 1.2);
      pricePerPound += purchase.betterPrice;
    }
  }
  updateScreen();
}

function drawHarvestBoost() {
  harvestBoostDisplay.innerHTML = "Harvest Boost+ " + farmMods.toString();
}

function drawRetailBoost() {
  retailBoostDisplay.innerHTML = "Retail Boost+ " + standMods.toString();
}

function updateScreen() {
  let pricePerPound_Currency = pricePerPound.toFixed(2);
  peachesDisplay.innerHTML = "Peaches Picked: " + peachesPicked.toString();
  cashDisplay.innerHTML = "Cash: $" + cash.toString();
  cashInDisplay.innerHTML = "Daily Retail: $" + dailyRetail.toString();
  cashOutDisplay.innerHTML = "Wage Load: $" + cashOut.toString();
  peachesInStorageDisplay.innerHTML =
    "Peaches in Cooler: " + peachesInCooler.toString();
  peachesSoldDisplay.innerHTML = "Peaches Sold: " + peachesSold.toString();
  pricePerPoundDisplay.innerHTML =
    "Price per Pound: $" + pricePerPound_Currency.toString();
  drawFarmEquipment();
  drawStandInfrastructure();
  drawFarmWorkers();
  drawFarmWorkersHired();
  drawHarvestBoost();
  drawRetailBoost();
  drawStandWorkers();
  drawStandWorkersHired();
}

// #region Draw Items:

// Farm Worker Draw
function drawFarmWorkers() {
  let template =
    "<tr><td>Name:</td><td class='pr-1'>Wage:</td><td class='pr-1 text-center'>Harvest Boost+</td></tr>";
  farmWorkers.forEach((item) => {
    template += getFarmWorkerTemplate(item);
  });

  farmWorkersDisplay.innerHTML = template;
}

//
function getFarmWorkerTemplate(item) {
  return /*html*/ `    
  <tr>
  <td>
  <button type="button" class="dropdown-item pt-0 pb-0 pl-0 pr-1" href="" onclick="addFarmWorker('${item.name}')">${item.name}:</button>
  </td>
  <td class="pr-1">
  $${item.pricePerDay}/day
  </td>
  <td class="text-center pr-1">
  ${item.multiplier}
  </td>
  </tr>  
  `;
}

// Stand Worker Draw
function drawStandWorkers() {
  let template =
    "<tr><td>Name:</td><td class='pr-1'>Wage:</td><td class='pr-1 text-center'>Retail Boost+</td></tr>";
  standWorkers.forEach((item) => {
    template += getStandWorkerTemplate(item);
  });

  standWorkersDisplay.innerHTML = template;
}

function getStandWorkerTemplate(item) {
  return /*html*/ `    
  <tr>
  <td>
  <button type="button" class="dropdown-item pt-0 pb-0 pl-0 pr-1" href="" onclick="addStandWorker('${item.name}')">${item.name}:</button>
  </td>
  <td class="pr-1">
  $${item.pricePerDay}/day
  </td>
  <td class="text-center pr-1">
  ${item.multiplier}
  </td>
  </tr>  
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
 <tr>
  <td>
  ${item.name}:
  </td>
  <td class="pr-1">
  $${item.pricePerDay}/day
  </td>
  <td class="text-center pr-1">
  ${item.multiplier}
  </td>
  </tr>  
  `;
}

function drawStandWorkersHired() {
  let template = "";
  standWorkersHired.forEach((item) => {
    template += getStandWorkersHiredTemplate(item);
  });

  standWorkersHiredDisplay.innerHTML = template;
}

function getStandWorkersHiredTemplate(item) {
  return /*html*/ `
  <div class="border-for-card"><p class="mb-0 pl-1"><u>
  ${item.name}</u>: $${item.pricePerDay}/day, Productivity: ${item.multiplier}<button type="button" class="btn" onclick="fireStandWorker('${item.name}')")>Fire</button></p>
  </div>
  `;
}

// Farm Equipment Draw
function drawFarmEquipment() {
  let template =
    "<tr><td>Name:</td><td class='pr-1'>Cost:</td><td class='pr-1 text-center'>Harvest Boost+</td></tr>";
  farmEquipment.forEach((item) => {
    template += getFarmEquipmentTemplate(item);
  });

  farmEquipmentDisplay.innerHTML = template;
}

function getFarmEquipmentTemplate(item) {
  return /*html*/ `
  <tr>
  <td>
  <button type="button" class="dropdown-item pt-0 pb-0 pl-0 pr-1" href="" onclick="addFarmEquipment('${item.name}')">${item.name}:</button>
  </td>
  <td class="pr-1">
  $${item.cost}
  </td>
        <td class="text-center pr-1">
        ${item.multiplier}
        </td>
        </tr>  
        `;
}

function drawStandInfrastructure() {
  let template =
    "<tr><td>Name:</td><td class='pr-1'>Cost:</td><td class='pr-1 text-center'>Price Boost+</td></tr>";
  standInfrastructure.forEach((item) => {
    template += getStandInfrastructureTemplate(item);
  });

  standInfrastructureDisplay.innerHTML = template;
}

function getStandInfrastructureTemplate(item) {
  return /*html*/ `
  <tr>
  <td>
  <button type="button" class="dropdown-item pt-0 pb-0 pl-0 pr-1" href="" onclick="addStandInfrastructure('${item.name}')">${item.name}:</button>
  </td>
  <td class="pr-1">
  $${item.cost}
  </td>
  <td class="text-center pr-1">
        Adds $${item.betterPrice}/lb
        </td>
        </tr>  
        `;
}

//
// //#endregion

// #region All the Runners
drawFarmWorkers();
drawStandWorkers();
drawFarmEquipment();
drawStandInfrastructure();
cashInterval();
// drawFarmSecurity();

// #endregion

// Farm Items
// let farmSecurity = [
//   {
//     name: "Ruskle the Farmdog",
//     cost: 400,
//     multiplier: 1,
//     critterDamage: 100,
//     requirement: 0,
//     adds: 1,
//   },
//   {
//     name: "Deputy Barkaroo",
//     cost: 300,
//     multiplier: 1,
//     critterDamage: 80,
//     requirement: 1,
//     adds: 1,
//   },
// ];
// Farm Security Draw
// function drawFarmSecurity() {
//   let template = "";
//   farmSecurity.forEach((item) => {
//     template += getFarmSecurityTemplate(item);
//   });

//   farmSecurityDisplay.innerHTML = template;
// }

// function getFarmSecurityTemplate(item) {
//   return /*html*/ `
//   <div class="border-for-card"><p> onclick="addFarmSecurity('${item.name}')">
//   ${item.name}: Cost: ${item.cost} Productivity: ${item.multiplier}
//   </p></div>
//   `;
// }
//
//
// //#region Possible Expansion

// function dayCountSummer() {
//   if (daysLeft_Summer > 0) {
//     daysLeft_Summer--;
//   } else {
//     daysLeft_Summer = 0;
//   }
//   updateScreen();
// }

// function daysLeftSummer() {
//   setInterval(dayCountSummer, 2000);
// }

// function pause() {
//   clearInterval(daysLeft_Summer);
// }

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
//     ${item.name}: Cost: ${item.price} Efficiency Boost: ${item.multiplier}
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
//   <button onclick="addThinningItems('${item.name}')">
//     ${item.name}: Cost: ${item.price} Efficiency Boost: ${item.multiplier}
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

// function fireFarmWorker(worker) {
//   for (let i = 0; i < farmWorkersHired.length; i++) {
//     let farmWorkerFired = farmWorkersHired[i];
//     if (farmWorkerFired.name == worker) {
//       farmMods -= farmWorkerFired.multiplier;
//       cashOut -= farmWorkerFired.pricePerDay;
//       farmWorkersHired.splice(i, 1);
//       farmWorkers.push(farmWorkerFired);
//       drawFarmWorkers();
//       drawFarmWorkersHired();
//     }
//   }
// }

// function fireStandWorker(worker) {
//   for (let i = 0; i < standWorkersHired.length; i++) {
//     let standWorkerFired = standWorkersHired[i];
//     if (standWorkerFired.name == worker) {
//       standMods -= standWorkerFired.multiplier;
//       cashOut -= standWorkerFired.pricePerDay;
//       standWorkersHired.splice(i, 1);
//       standWorkers.push(standWorkerFired);
//       drawStandWorkers();
//       drawStandWorkersHired();
//     }
//   }
// }
