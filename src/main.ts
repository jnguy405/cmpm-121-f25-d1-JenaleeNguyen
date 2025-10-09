import "./style.css";

// Initialize default state
let counter = 0;
let RPS = 0; // ricebowls per second
let lastTime = performance.now();

// Render UI
document.body.innerHTML = `
  <div class="section">
    <div class="container">
      <button id="icon" class="icon">🍚</button>
      <div class="count">Counter: <span id="counter">0 ricebowls</span></div>
      <button id="upgrade" class="upgrade" disabled>Buy Upgrade (Cost: 10)</button>
    </div>
  </div>
  <div class="section"></div>
  <div class="section"></div>
`;

// Get elements
const button = document.getElementById("icon") as HTMLButtonElement;
const counterElement = document.getElementById("counter") as HTMLElement;
const upgradeButton = document.getElementById("upgrade") as HTMLButtonElement;

// Function to update counter display (whole numbers only)
function updateCounter() {
  counterElement.textContent = `${Math.floor(counter)} ricebowls`;

  // Enable or disable upgrade button based on affordability
  upgradeButton.disabled = counter < 10;
}

// Handle rice button clicks
button.addEventListener("click", () => {
  counter += 1; // One rice per click
  updateCounter();
});

// Handle upgrade purchases
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10; // Spend 10
    RPS += 1; // Add 1 rice per second
    console.log(`Upgrade purchased! New RPS: ${RPS}`);
    updateCounter();
  }
});

function animate(time: number) {
  const delta = (time - lastTime) / 1000; // convert ms to sec
  lastTime = time;

  counter += RPS * delta; // fractional growth
  updateCounter(); // display as whole number

  requestAnimationFrame(animate);
}

// Start animation
requestAnimationFrame(animate);
