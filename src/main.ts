import "./style.css";

// ====== INTERFACES ======
interface Item {
  name: string;
  description: string;
  cost: number;
  rate: number;
  count: number;
  produced: number; // total bowls of rice produced so far
}

// ====== STATE ======
let counter = 0;
let RPS = 0; // bowls of rice per second
let lastTime = performance.now();

// ====== CONFIG DATA ======
const availableItems: Item[] = [
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

const RiceButton = document.getElementById("icon") as HTMLButtonElement;
const CounterElement = document.getElementById("counter") as HTMLElement;
const RPSElement = document.getElementById("rps") as HTMLElement;
const UpgradesContainer = document.getElementById("upgrades") as HTMLElement;

// ====== HELPER FUNCTIONS ======
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
  btn.disabled = counter < item.cost;
  btn.textContent = `${item.name} (Cost: ${item.cost.toFixed(2)} bowls)`;
  document.getElementById(`count-${index}`)!.textContent =
    `Owned: ${item.count}`;
  document.querySelectorAll(".upgrade-item")[index].setAttribute(
    "data-tooltip",
    buildTooltip(item),
  );
}

function updateDisplay(): void {
  CounterElement.textContent = `${counter.toFixed(2)} bowls of rice`;
  RPSElement.textContent = `${RPS.toFixed(1)}`;
  availableItems.forEach(updateItemDisplay);
}

// ====== GAME LOOP ======
function animate(time: number): void {
  const delta = (time - lastTime) / 1000;
  lastTime = time;
  counter += RPS * delta;

  availableItems.forEach((item) => {
    item.produced += item.rate * item.count * delta;
  });

  updateDisplay();
  requestAnimationFrame(animate);
}

// ====== EVENT LISTENERS ======
RiceButton.addEventListener("click", () => {
  counter += 1;
  updateDisplay();

  // Click animation
  RiceButton.classList.remove("pulse");
  void RiceButton.offsetWidth; // reset animation
  RiceButton.classList.add("pulse");
});

// Render upgrade elements
availableItems.forEach((item, i) => {
  const div = createUpgradeElement(item, i);
  UpgradesContainer.appendChild(div);
});

// Collect references to upgrade buttons
const upgradeButtons = availableItems.map(
  (_, i) => document.getElementById(`upgrade-${i}`) as HTMLButtonElement,
);

// Purchase logic
availableItems.forEach((item, i) => {
  upgradeButtons[i].addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      item.count++;
      RPS += item.rate;
      item.cost *= 1.15; // price inflation
      updateDisplay();
    }
  });
});

// Start the game loop
requestAnimationFrame(animate);
