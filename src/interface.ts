// interface.ts
// UI component creation and dynamic updates for upgrade items including tooltips and button state management.

import { Item } from "./items.ts";

// Build tooltip content for an item
export function buildTooltip(item: Item): string {
  const individualRate = item.rate;
  const totalRate = item.rate * item.count;
  const totalProduced = item.produced;

  // Use template literals for better readability
  return (
    `• Each ${item.name} produces ${
      individualRate.toFixed(2)
    } bowls per second\n` +
    `• ${item.count} ${item.name}${item.count !== 1 ? "s" : ""} producing ${
      totalRate.toFixed(2)
    } bowls per second\n` +
    `• ${totalProduced.toFixed(1)} bowls produced by this ${item.name}${
      item.count !== 1 ? "s" : ""
    } so far`
  );
}

// Create the HTML element for an upgrade item
export function createUpgradeElement(
  item: Item,
  index: number,
): HTMLDivElement {
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

// Update the display of an upgrade item based on its current state
export function updateItemDisplay(
  item: Item,
  index: number,
  counter: number,
): void {
  const btn = document.getElementById(`upgrade-${index}`) as HTMLButtonElement;
  btn.disabled = counter < item.cost;
  btn.textContent = `${item.name} (Cost: ${item.cost.toFixed(2)} bowls)`;

  document.getElementById(`count-${index}`)!.textContent =
    `Owned: ${item.count}`;
  document.querySelectorAll(".upgrade-item")[index].setAttribute(
    "data-tooltip",
    buildTooltip(item),
  );
}
