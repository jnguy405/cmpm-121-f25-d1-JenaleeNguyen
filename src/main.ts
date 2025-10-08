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

// Function to update counter display
function updateCounter() {
  counterElement.textContent = `${counter} ricebowls`;
}

// Handle clicks
button.addEventListener("click", () => {
  counter += RPS;
  updateCounter();
  console.log(`Ricebowls per Second (RPS): ${RPS}, Total: ${counter}`);
});

// Automatic increment every second
setInterval(() => {
  counter += RPS;
  updateCounter();
  console.log(`Auto increment: ${counter} ricebowls`);
}, 1000);
