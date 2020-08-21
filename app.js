// Starting Variables
let peachesPicked = 0;
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

// items/upgrades
let pruningItems = {
  pruners: {
    name: "Pruners",
    price: 10,
    quantity: 1,
    multiplier: 5,
    durability: 100,
  },
  mechanicalPruners: {
    name: "Mechanical Pruners",
    price: 40,
    quantity: 0,
    multiplier: 8,
    durability: 80,
  },
  extensionSaw: {
    name: "Extension Saw",
    price: 120,
    quantity: 0,
    multiplier: 75,
    durability: 150,
  },
};
let thinningItems;
let pickingItems;

let farmWorkers = {
  farmManager: {
    name: "Farm Manager",
    pricePerDay: 0,
    multiplier: 25,
    experience: 2,
  },
  kid: {
    name: "Kid",
    pricePerDay: 20,
    multiplier: 10,
    experience: 2,
  },
  highSchooler: {
    name: "High Schooler",
    pricePerDay: 60,
    multiplier: 8,
    experience: 0,
  },
  goGetter: {
    name: "Go Getter",
    pricePerDay: 100,
    multiplier: 20,
    experience: 4,
  },
  farmLegend: {
    name: "Farm Legend",
    pricePerDay: 150,
    multiplier: 35,
    experience: 10,
  },
};

let standWorkers = {
  standManager: {
    name: "Stand Manager",
    pricePerDay: 0,
    multiplier: 20,
    experience: 0,
  },
  retailer: {
    name: "Retail Seller",
    pricePerDay: 75,
    multiplier: 10,
    experience: 0,
  },
  boxer: {
    name: "Boxer",
    pricePerDay: 80,
    multiplier: 15,
    experience: 0,
  },
};

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

function addSalesMods() {}

function sales() {
  daysLeftSummer();
  // addMods()
  // TODO cash inflow needs to equal the amount of bushels
}

function pick() {
  if (daysLeft_Summer < 100) {
    peachesPicked++;
  }
  updateScreen();
}

function updateScreen() {
  bushelsDisplay.innerHTML = "Bushels Picked: " + peachesPicked.toString();
  daysLeftDisplay.innerHTML = "Days Left: " + daysLeft_Summer.toString();
  cashDisplay.innerHTML = "Cash: $" + cash.toString();
}
