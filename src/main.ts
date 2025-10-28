import "./style.css";

// ====== INTERFACES ======
// Defines the data structure for upgrade items (e.g., name, cost, production rate)
interface Item {
  name: string;
  description: string;
  cost: number;
  rate: number;
  count: number;
  produced: number; // total bowls of rice produced so far
}

// ====== STATE ======
// Tracks current resource count, production rate, and last frame timestamp
let resourceCount = 0;
let productionRate = 0;
let lastTime = performance.now();

// ====== CONFIG DATA ======
// List of available upgrades with their base stats and progression mechanics
const upgrades: Item[] = [
  {
    name: "Rice Farmer",
    description: "Humble worker who plants and harvests rice by hand.",
    cost: 10,
    rate: 0.1,
    count: 0,
    produced: 0,
  },
  {
    name: "Rice Mill",
    description: "Mechanized mill that processes rice faster than ever.",
    cost: 100,
    rate: 2.0,
    count: 0,
    produced: 0,
  },
  {
    name: "Rice Market",
    description:
      "A cozy kitchen where rice becomes sushi, onigiri, and sweet treats!",
    cost: 500,
    rate: 10,
    count: 0,
    produced: 0,
  },
  {
    name: "Golden Wok",
    description:
      "A mystical wok that multiplies your harvest with radiant golden energy.",
    cost: 1000,
    rate: 50,
    count: 0,
    produced: 0,
  },
  {
    name: "Rice Temple",
    description: "Ancient monks chant blessings to supercharge your harvest.",
    cost: 10000,
    rate: 300,
    count: 0,
    produced: 0,
  },
  {
    name: "Celestial Dragon",
    description:
      "A divine dragon soars over your fields to raise fortune and prosperity.",
    cost: 13000,
    rate: 2500,
    count: 0,
    produced: 0,
  },
  {
    name: "Dragon Warrior",
    description:
      "The ultimate rice producer: a legendary warrior whose every strike yields endless grains.",
    cost: 25000,
    rate: 15000,
    count: 0,
    produced: 0,
  },
];

// ====== DOM SETUP ======
// Builds initial UI layout and caches references to key DOM elements
document.body.innerHTML = `
  <!-- Left: Main click area -->
  <div class="section">
    <div class="container">
      <div class="count">Total Harvest: <span id="counter">0.00 bowls of rice</span></div>
      <div class="growth">per second: <span id="rps">0.0</span></div>
      <button id="icon" class="icon" title="Harvest Rice">🍚</button>
    </div>
  </div>

  <!-- Middle spacer -->
  <div class="section"></div>

  <!-- Right: Upgrades -->
  <div class="section" id="upgrades"></div>
`;

const resourceButton = document.getElementById("icon") as HTMLButtonElement;
const CounterElement = document.getElementById("counter") as HTMLElement;
const productionRateElement = document.getElementById("rps") as HTMLElement;
const UpgradesContainer = document.getElementById("upgrades") as HTMLElement;

// ====== HELPER FUNCTIONS ======
// Utilities for rendering tooltips, creating/updating UI elements, and refreshing display values
function buildTooltip(item: Item): string {
  const individualRate = item.rate;
  const totalRate = item.rate * item.count;
  const totalProduced = item.produced;

  return (
    `• Each ${item.name} produces ${
      individualRate.toFixed(2)
    } bowls per second\n` +
    `• ${item.count} ${item.name}${item.count !== 1 ? "s" : ""} producing ${
      totalRate.toFixed(2)
    } bowls per second\n` +
    `• ${totalProduced.toFixed(1)} bowls of rice produced by this ${item.name}${
      item.count !== 1 ? "s" : ""
    } so far`
  );
}

function createUpgradeElement(item: Item, index: number): HTMLDivElement {
  const div = document.createElement("div");
  div.className = "upgrade-item";
  div.setAttribute("data-tooltip", buildTooltip(item));

  div.innerHTML = `
    <button id="upgrade-${index}" class="upgrade" disabled>
      ${item.name} (Cost: ${item.cost.toFixed(2)} bowls)
    </button>
    <span id="count-${index}">Owned: ${item.count}</span>
    <p class="description">${item.description}</p>
  `;
  return div;
}

function updateItemDisplay(item: Item, index: number): void {
  const btn = upgradeButtons[index];
  btn.disabled = resourceCount < item.cost;
  btn.textContent = `${item.name} (Cost: ${item.cost.toFixed(2)} bowls)`;
  document.getElementById(`count-${index}`)!.textContent =
    `Owned: ${item.count}`;
  document.querySelectorAll(".upgrade-item")[index].setAttribute(
    "data-tooltip",
    buildTooltip(item),
  );
}

function updateDisplay(): void {
  CounterElement.textContent = `${resourceCount.toFixed(2)} bowls of rice`;
  productionRateElement.textContent = `${productionRate.toFixed(1)}`;
  upgrades.forEach(updateItemDisplay);
}

// ====== GAME LOOP ======
// Runs continuously to update resource count and UI based on elapsed time
function animate(time: number): void {
  const delta = (time - lastTime) / 1000;
  lastTime = time;
  resourceCount += productionRate * delta;

  upgrades.forEach((item) => {
    item.produced += item.rate * item.count * delta;
  });

  updateDisplay();
  requestAnimationFrame(animate);
}

// ====== EVENT LISTENERS ======
// Handles player input: clicking the rice button and purchasing upgrades
resourceButton.addEventListener("click", () => {
  resourceCount += 1;
  updateDisplay();

  // Click animation
  resourceButton.classList.remove("pulse");
  void resourceButton.offsetWidth; // reset animation
  resourceButton.classList.add("pulse");
});

// Render upgrade elements
upgrades.forEach((item, i) => {
  const div = createUpgradeElement(item, i);
  UpgradesContainer.appendChild(div);
});

// Collect references to upgrade buttons
const upgradeButtons = upgrades.map(
  (_, i) => document.getElementById(`upgrade-${i}`) as HTMLButtonElement,
);

// Purchase logic
upgrades.forEach((item, i) => {
  upgradeButtons[i].addEventListener("click", () => {
    if (resourceCount >= item.cost) {
      resourceCount -= item.cost;
      item.count++;
      productionRate += item.rate;
      item.cost *= 1.15; // price inflation
      updateDisplay();
    }
  });
});

// Start the game loop
requestAnimationFrame(animate);
