// main.ts
// Main entry point: sets up the UI, event listeners, and starts the animation loop.

import { animate, buyItem, getGameState, updateDisplay } from "./gamestates.ts";
import { createUpgradeElement } from "./interface.ts";
import { availableItems } from "./items.ts";
import "./style.css";

// Build UI
document.body.innerHTML = `
  <div class="section">
    <div class="container">
      <div class="count">Total Harvest: <span id="counter">0.00 bowls of rice</span></div>
      <div class="growth">per second: <span id="rps">0.0</span></div>
      <button id="icon" class="icon">🍚</button>
    </div>
  </div>
  <div class="section"></div>
  <div class="section" id="upgrades"></div>
`;

// Cache DOM elements
const RiceButton = document.getElementById("icon") as HTMLButtonElement;
const UpgradesContainer = document.getElementById("upgrades") as HTMLElement;

// Render upgrades dynamically
availableItems.forEach((item, i) => {
  const div = createUpgradeElement(item, i);
  UpgradesContainer.appendChild(div);

  const btn = div.querySelector("button")!;
  btn.addEventListener("click", () => {
    buyItem(item);
    updateDisplay();
  });
});

// Click logic
RiceButton.addEventListener("click", () => {
  const state = getGameState();
  state.counter += 1;
  updateDisplay();
  RiceButton.classList.remove("pulse");
  void RiceButton.offsetWidth;
  RiceButton.classList.add("pulse");
});

// Start the loop
requestAnimationFrame(animate);
