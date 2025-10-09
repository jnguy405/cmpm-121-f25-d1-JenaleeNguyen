import "./style.css";

// Initialize default state
let counter = 0;
const RPS = 1; // ricebowls per second

// Render UI
document.body.innerHTML = `
  <button id="icon" class="icon">🍚</button>
  <div class="count">Counter: <span id="counter">0 ricebowls</span></div>
`;

// Get elements
const button = document.getElementById("icon") as HTMLButtonElement;
const counterElement = document.getElementById("counter") as HTMLElement;

// Function to update counter display (whole numbers only)
function updateCounter() {
  counterElement.textContent = `${Math.floor(counter)} ricebowls`;
}

// Handle clicks
button.addEventListener("click", () => {
  counter += RPS;
  updateCounter();
  console.log(
    `Ricebowls per Second (RPS): ${RPS}, Total: ${Math.floor(counter)}`,
  );
});

// Continuous growth using based on display refresh rate
let lastTime = performance.now();

function animate(time: number) {
  const delta = (time - lastTime) / 1000; // convert ms to sec
  lastTime = time;

  counter += RPS * delta; // fractional growth
  updateCounter(); // display as whole number

  requestAnimationFrame(animate);
}

// Start animation
requestAnimationFrame(animate);
