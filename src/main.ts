import "./style.css";

// Define interface for items
interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
}

// Initialize default state
let counter = 0;
let RPS = 0; // bowls per second
let lastTime = performance.now();

// Data-driven item list
const availableItems: Item[] = [
  { name: "Rice Farmer", cost: 10, rate: 0.1, count: 0 },
  { name: "Rice Mill", cost: 100, rate: 2.0, count: 0 },
  { name: "Golden Wok", cost: 1000, rate: 50, count: 0 },
];

// Render UI
document.body.innerHTML = `
  <!-- Left: Main click area -->
  <div class="section">
    <div class="container">
      <div class="count">
        Total Harvest: <span id="counter">0.00 bowls of rice</span>
      </div>
      <div class="growth">
        per second: <span id="rps">0.0</span>
      </div>
      <button id="icon" class="icon" title="Harvest Rice">🍚</button>
    </div>
  </div>

  <!-- Middle spacer -->
  <div class="section"></div>

  <!-- Right: Upgrades -->
  <div class="section" id="upgrades"></div>
`;

// Get elements
const RiceButton = document.getElementById("icon") as HTMLButtonElement;
const CounterElement = document.getElementById("counter") as HTMLElement;
const RPSElement = document.getElementById("rps") as HTMLElement;
const UpgradesContainer = document.getElementById("upgrades") as HTMLElement;

// Click handler (harvest)
RiceButton.addEventListener("click", () => {
  counter += 1;
  updateDisplay();

  // Small pulse animation for feedback
  RiceButton.classList.remove("pulse");
  void RiceButton.offsetWidth;
  RiceButton.classList.add("pulse");
});

// UPGRADES ----------------------------------------------------------

// Generate upgrade buttons dynamically
availableItems.forEach((item, i) => {
  const div = document.createElement("div");
  div.className = "upgrade-item";
  div.innerHTML = `
    <button id="upgrade-${i}" class="upgrade" disabled>
      ${item.name} (Cost: ${item.cost.toFixed(2)} bowls)
    </button>
    <span id="count-${i}">Owned: ${item.count}</span>
  `;
  UpgradesContainer.appendChild(div);
});

// Store button references
const upgradeButtons = availableItems.map((_, i) =>
  document.getElementById(`upgrade-${i}`) as HTMLButtonElement
);

// Handle item purchases
availableItems.forEach((item, i) => {
  upgradeButtons[i].addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      item.count++;
      RPS += item.rate;

      // Increase price by 15% after each purchase
      item.cost *= 1.15;

      updateDisplay();
    }
  });
});

// DISPLAY & ANIMATION --------------------------------------------

// Update display
function updateDisplay() {
  CounterElement.textContent = `${counter.toFixed(2)} bowls of rice`;
  RPSElement.textContent = `${RPS.toFixed(1)}`;

  availableItems.forEach((item, i) => {
    const btn = upgradeButtons[i];
    btn.disabled = counter < item.cost;
    btn.textContent = `${item.name} (Cost: ${item.cost.toFixed(2)} bowls)`;
    document.getElementById(`count-${i}`)!.textContent = `Owned: ${item.count}`;
  });
}

// Animation loop (auto-increase)
function animate(time: number) {
  const delta = (time - lastTime) / 1000;
  lastTime = time;
  counter += RPS * delta;
  updateDisplay();
  requestAnimationFrame(animate);
}

// Start animation
requestAnimationFrame(animate);
