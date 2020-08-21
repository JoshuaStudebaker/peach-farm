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

let workers;

// Element IDs
let bushelsDisplay = document.getElementById("bushelCount");

// Game
function pick() {
  peachesPicked++;
  update();
}

function update() {
  bushelsDisplay.innerHTML = "Bushels Picked: " + peachesPicked.toString();
}
