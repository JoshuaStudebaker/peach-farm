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
let daysLeft_Winter =  60;
let daysLeft_Spring = 90;
let daysLeft_Summer = 100;
let winter = "Winter";
let spring = "Spring"
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

// Element IDs
let bushelsDisplay = document.getElementById("bushelCount");
let timeOfYear = document.getElementById('time-of-year')
// Intervals
function dayCount{
  daysLeft_Winter--
  daysLeft_Spring--
  daysLeft_Summer--
}

function season() {

}
function dayInterval() {
  let days = setInterval(dayCount, 2000)
}

function drawSummer() {
  let template
}

// Game
function pick() {
  peachesPicked++;
  update();
}

function update() {
  bushelsDisplay.innerHTML = "Bushels Picked: " + peachesPicked.toString();
}
