import "./style.css";

// Initialize default state
let counter = 0;
let rps = 1; // ricebowls per second

// Render UI
document.body.innerHTML = `
  <button id="icon" class="icon">🍚</button>
  <div class="count">Counter: <span id="counter">0 ricebowls</span></div>
`;

// Get elements
const button = document.getElementById("icon") as HTMLButtonElement;
const counterElement = document.getElementById("counter") as HTMLElement;

// Handle clicks
button.addEventListener("click", () => {
  counter += rps;
  counterElement.textContent = `${counter} ricebowls`;
  console.log(`Ricebowls per second (rps): ${rps}, Total: ${counter}`);
});
