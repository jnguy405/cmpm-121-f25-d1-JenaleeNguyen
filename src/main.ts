import "./style.css";

// Initialize default state
let counter = 0;
let RPS = 0; // bowls per second
let lastTime = performance.now();

// Define themed upgrades
const upgrades = [
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

  <!-- Middle spacer: for later graphics -->
  <div class="section"></div>

  <!-- Right: Upgrades -->
  <div class="section" id="upgrades"></div>
`;

// Get elements
const RiceButton = document.getElementById("icon") as HTMLButtonElement;
const CounterElement = document.getElementById("counter") as HTMLElement;
const RPSElement = document.getElementById("rps") as HTMLElement;
const UpgradesContainer = document.getElementById("upgrades") as HTMLElement;

// Handle rice button click (harvest action)
RiceButton.addEventListener("click", () => {
  counter += 1;
  updateDisplay();

  RiceButton.classList.remove("pulse");
  void RiceButton.offsetWidth;
  RiceButton.classList.add("pulse");
});

// UPGRADES ----------------------------------------------------------

// Generate upgrade buttons
upgrades.forEach((upgrade, i) => {
  const div = document.createElement("div");
  div.className = "upgrade-item";
  div.innerHTML = `
    <button id="upgrade-${i}" class="upgrade" disabled>
      ${upgrade.name} (Cost: ${upgrade.cost.toFixed(2)} bowls)
    </button>
    <span id="count-${i}">Owned: ${upgrade.count}</span>
  `;
  UpgradesContainer.appendChild(div);
});

// Upgrade button array with ID references
const upgradeButtons = upgrades.map((_, i) =>
  document.getElementById(`upgrade-${i}`) as HTMLButtonElement
);

// Handle upgrade purchases
upgrades.forEach((upgrade, i) => {
  upgradeButtons[i].addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      upgrade.count++;
      RPS += upgrade.rate;

      // Price increases by 15% per purchase
      upgrade.cost *= 1.15;

      updateDisplay();
    }
  });
});

// DISPLAY & ANIMATION --------------------------------------------

// Update display
function updateDisplay() {
  CounterElement.textContent = `${counter.toFixed(2)} bowls of rice`;
  RPSElement.textContent = `${RPS.toFixed(1)}`;

  upgrades.forEach((upgrade, i) => {
    const btn = upgradeButtons[i];
    btn.disabled = counter < upgrade.cost;
    btn.textContent = `${upgrade.name} (Cost: ${
      upgrade.cost.toFixed(2)
    } bowls)`;
    document.getElementById(`count-${i}`)!.textContent =
      `Owned: ${upgrade.count}`;
  });
}

// Animation loop
function animate(time: number) {
  const delta = (time - lastTime) / 1000;
  lastTime = time;
  counter += RPS * delta; // fractional growth
  updateDisplay();
  requestAnimationFrame(animate);
}

// Start animate
requestAnimationFrame(animate);
