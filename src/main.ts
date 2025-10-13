import "./style.css";

// Initialize default state
let counter = 0;
let RPS = 0; // ricebowls per second
let lastTime = performance.now();

// Define upgrades
const upgrades = [
  { name: "A", cost: 10, rate: 0.1, count: 0 },
  { name: "B", cost: 100, rate: 2.0, count: 0 },
  { name: "C", cost: 1000, rate: 50, count: 0 },
];

// Render UI
document.body.innerHTML = `
  <div class="section">
    <div class="container">
      <div class="count">
        Counter: <span id="counter">0 ricebowls</span>
      </div>
      <div class="growth">
        Growth Rate: <span id="rps">0.0 ricebowls/sec</span>
      </div>
      <button id="icon" class="icon">🍚</button>
    </div>
  </div>

  <div class="section"></div>

  <div class="section">
    <div class="container" id="upgrades"></div>
  </div>
`;

// Get elements
const RiceButton = document.getElementById("icon") as HTMLButtonElement;
const CounterElement = document.getElementById("counter") as HTMLElement;
const RPSElement = document.getElementById("rps") as HTMLElement;
const UpgradesContainer = document.getElementById("upgrades") as HTMLElement;

// Handle rice button click
RiceButton.addEventListener("click", () => {
  counter += 1;
  updateDisplay();

  RiceButton.classList.remove("pulse");
  void RiceButton.offsetWidth;
  RiceButton.classList.add("pulse");
});

// Generate upgrade buttons
upgrades.forEach((upgrade, i) => {
  const div = document.createElement("div");
  div.className = "upgrade-item";
  div.innerHTML = `
    <button id="upgrade-${i}" class="upgrade" disabled>
      Buy ${upgrade.name} (Cost: ${upgrade.cost})
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
      updateDisplay();
    }
  });
});

// Update display
function updateDisplay() {
  CounterElement.textContent = `${Math.floor(counter)} ricebowls`;
  RPSElement.textContent = `${RPS.toFixed(1)} ricebowls/sec`;

  upgrades.forEach((upgrade, i) => {
    const btn = upgradeButtons[i];
    btn.disabled = counter < upgrade.cost;
    document.getElementById(`count-${i}`)!.textContent =
      `Owned: ${upgrade.count}`;
  });
}

// Animation loop
function animate(time: number) {
  const delta = (time - lastTime) / 1000;
  lastTime = time;
  counter += RPS * delta; // fractional growth
  updateDisplay(); // display as whole number
  requestAnimationFrame(animate);
}

// Start animate
requestAnimationFrame(animate);
