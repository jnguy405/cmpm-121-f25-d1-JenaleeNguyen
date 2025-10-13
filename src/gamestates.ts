// gamestates.ts
// Game state management including resource tracking, RPS calculation, item purchasing logic, and the main animation loop.

import { updateItemDisplay } from "./interface.ts";
import { availableItems, Item } from "./items.ts";

// Game state variables
let counter = 0;
let RPS = 0;
let lastTime = performance.now();

// Get the current game state
export function getGameState() {
  return { counter, RPS, availableItems };
}

// Update the main display elements
export function updateDisplay(): void {
  document.getElementById("counter")!.textContent = `${
    counter.toFixed(2)
  } bowls of rice`;
  document.getElementById("rps")!.textContent = `${RPS.toFixed(1)}`;
  availableItems.forEach((item, i) => updateItemDisplay(item, i, counter));
}

// Purchase an item if enough resources are available
export function buyItem(item: Item): void {
  if (counter >= item.cost) {
    counter -= item.cost;
    item.count++;
    RPS += item.rate;
    item.cost *= 1.15;
  }
}

// Main animation loop to update resources based on RPS and elapsed time
export function animate(time: number): void {
  const delta = (time - lastTime) / 1000;
  lastTime = time;
  counter += RPS * delta;

  availableItems.forEach((item) => {
    item.produced += item.rate * item.count * delta;
  });

  updateDisplay();
  requestAnimationFrame(animate);
}
