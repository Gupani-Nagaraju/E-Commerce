// src/stores/data/allProducts.js

// 1–4: existing ones
import { tvData } from "./tv";
import { watchData } from "./watch";
import { womanData } from "./woman";
import { speakerData } from "./speaker";

// 5–8: ones you already shared
import { acData } from "./ac";
import { booksData } from "./books";
import { computerData } from "./computers";
import { fridgeData } from "./fridge";

// 9–12: add your remaining four datasets here
// (examples; update names/paths to match your project)
import { furnitureData } from "./furniture";
import { mobileData } from "./mobiles";        // e.g. phones page
import { menData } from "./men";              // e.g. men clothing
import {kitchenData } from "./kitchen";  // e.g. headphones/earbuds

// Helper to normalize and add common fields
const withCommonFields = (arr, section) =>
  arr.map((item, index) => ({
    id: item.id || `${section}-${index + 1}`,
    _section: section,
    product: item.product || item.title || item.model || "",
    model: item.model || item.title || item.product || "",
    brand: item.brand || item.company || item.author || "",
    ...item,
  }));

export const allProducts = [
  // 1–4
  ...withCommonFields(tvData, "TV"),
  ...withCommonFields(watchData, "Watch"),
  ...withCommonFields(womanData, "Women"),
  ...withCommonFields(speakerData, "Speaker"),

  // 5–8
  ...withCommonFields(acData, "AC"),
  ...withCommonFields(booksData, "Books"),
  ...withCommonFields(computerData, "Computer"),
  ...withCommonFields(fridgeData, "Fridge"),

  // 9–12
  ...withCommonFields(furnitureData, "Furniture"),
  ...withCommonFields(mobileData, "Mobile"),
  ...withCommonFields(menData, "Men"),
  ...withCommonFields(kitchenData, "Kitchen"),
];
