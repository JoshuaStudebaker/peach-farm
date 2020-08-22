// Starting Variables
let peachesPicked = 0;
let bushelsPicked = 0;
let peachesSold = 0;
let pricePerPound_1s = 3.5;
let pricePerPound_2s = 1;
let pricePerPound_Wholesale = 1.5;
let bushelsPerTree = 0;
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
let salesMods = 1;

// items/upgrades
let pruningItems = [
  {
    name: "Pruners",
    price: 10,
    quantity: 1,
    multiplier: 5,
    durability: 100,
  },
  {
    name: "Mechanical Pruners",
    price: 40,
    quantity: 0,
    multiplier: 8,
    durability: 80,
  },
  {
    name: "Extension Saw",
    price: 120,
    quantity: 0,
    multiplier: 75,
    durability: 150,
  },
];
let thinningItems = [
  {
    name: "By Hand",
    price: 10,
    quantity: 1,
    multiplier: 5,
    durability: 100,
  },
  {
    name: "The Whacker",
    price: 40,
    quantity: 0,
    multiplier: 8,
    durability: 80,
  },
  {
    name: "Thinning Machine",
    price: 120,
    quantity: 0,
    multiplier: 75,
    durability: 150,
  },
];
let pickingItems;

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

// Element IDs
let bushelsDisplay = document.getElementById("bushel-count");
let timeOfYearDisplay = document.getElementById("time-of-year");
let daysLeftDisplay = document.getElementById("days-left");
let cashDisplay = document.getElementById("cash");

// Intervals
function dayCountSummer() {
  if (daysLeft_Summer > 0) {
    daysLeft_Summer--;
  } else {
    daysLeft_Summer = 0;
  }
  updateScreen();
}

function season() {}

function daysLeftSummer() {
  let days = setInterval(dayCountSummer, 1000);
}

function drawSummer() {
  let template;
}

// Game

function addSales() {
  let helper = standWorkers.standManager.multiplier;
  salesMods = salesMods + helper;
  console.log(salesMods);
}

function peachSelling() {
  if (bushelsPicked > 0) {
    bushelsPicked -= salesMods;
    peachesSold = salesMods;
    cash += peachesSold * pricePerPound_1s;
  }
  updateScreen();
}

function cashInterval() {
  let cash = setInterval(peachSelling, 2000);
}

function sales() {
  daysLeftSummer();
  // addMods()
  // TODO cash inflow needs to equal the amount of bushels
}

function addWorker() {
  let helper = farmWorkers[0].multiplier;
  farmMods = farmMods + helper;
  console.log(farmMods);
}
cashInterval();
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

// Draw Items:
function drawFarmWorkers() {
  let template = "";
  farmWorkers.forEach((item) => {
    template += getFarmWorkerTemplate(item);
  });

  farmWorkersDisplay.innerHTML = template;
}

function getFarmWorkerTemplate(item) {
  return /*html*/ `
  <button onclick="addFarmWorker('${item.name}')">
    ${item.name}: Cost: ${item.pricePerDay} Productivity: ${item.multiplier}
  </button>
  `;
}

let farmWorkersDisplay = document.getElementById("farmWorkers");

drawFarmWorkers();

function drawStandWorkers() {
  let template = "";
  standWorkers.forEach((item) => {
    template += getStandWorkerTemplate(item);
  });

  standWorkersDisplay.innerHTML = template;
}

function getStandWorkerTemplate(item) {
  return /*html*/ `
  <button onclick="addStandWorker('${item.name}')">
    ${item.name}: Cost: ${item.pricePerDay} Productivity: ${item.multiplier}
  </button>
  `;
}

let standWorkersDisplay = document.getElementById("standWorkers");

drawStandWorkers();

function drawPruningItems() {
  let template = "";
  pruningItems.forEach((item) => {
    template += getPruningItemsTemplate(item);
  });

  PruningItemsDisplay.innerHTML = template;
}

function getPruningItemsTemplate(item) {
  return /*html*/ `
  <button onclick="addPruningItems('${item.name}')">
    ${item.name}: Cost: ${item.price} Efficiency Bost: ${item.multiplier}
  </button>
  `;
}

let PruningItemsDisplay = document.getElementById("pruningItems");

drawPruningItems();

function drawThinningItems() {
  let template = "";
  thinningItems.forEach((item) => {
    template += getThinningItemsTemplate(item);
  });

  ThinningItemsDisplay.innerHTML = template;
}

function getThinningItemsTemplate(item) {
  return /*html*/ `
  <button onclick="addthinningItems('${item.name}')">
    ${item.name}: Cost: ${item.price} Efficiency Bost: ${item.multiplier}
  </button>
  `;
}

let ThinningItemsDisplay = document.getElementById("thinningItems");

drawThinningItems();
