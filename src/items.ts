// items.ts
// Item definitions and data-driven design for upgrades including cost scaling, production rates, and descriptions.

// Define the Item interface
export interface Item {
  name: string;
  description: string;
  cost: number;
  rate: number;
  count: number;
  produced: number; // total bowls of rice produced so far
}

// Define available upgrade items (data-driven design)
export const availableItems: Item[] = [
  {
    name: "Rice Farmer",
    description: "Humble worker who plants and harvests rice by hand.",
    cost: 10,
    rate: 0.1,
    count: 0,
    produced: 0,
  },
  {
    name: "Rice Mill",
    description: "Mechanized mill that processes rice faster than ever.",
    cost: 100,
    rate: 2.0,
    count: 0,
    produced: 0,
  },
  {
    name: "Rice Market",
    description:
      "A cozy kitchen where rice becomes sushi, onigiri, and sweet treats!",
    cost: 500,
    rate: 10,
    count: 0,
    produced: 0,
  },
  {
    name: "Golden Wok",
    description:
      "A mystical wok that multiplies your harvest with radiant golden energy.",
    cost: 1000,
    rate: 50,
    count: 0,
    produced: 0,
  },
  {
    name: "Rice Temple",
    description: "Ancient monks chant blessings to supercharge your harvest.",
    cost: 10000,
    rate: 300,
    count: 0,
    produced: 0,
  },
  {
    name: "Celestial Dragon",
    description:
      "A divine dragon soars over your fields to raise fortune and prosperity.",
    cost: 13000,
    rate: 2500,
    count: 0,
    produced: 0,
  },
  {
    name: "Dragon Warrior",
    description:
      "The ultimate rice producer: a legendary warrior whose every strike yields endless grains.",
    cost: 25000,
    rate: 15000,
    count: 0,
    produced: 0,
  },
];
