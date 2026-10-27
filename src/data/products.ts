import type { Category, Product, ProductIcon } from "@/types";

// Sample data for the demo store.
// The admin page can add, edit and delete products; those changes are saved
// in the browser's localStorage. This file is only the starting point.

export const CATEGORIES: Category[] = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Sports",
  "Books",
];

/** Short description for each category, shown on the home page. */
export const CATEGORY_DETAILS: Record<Category, { blurb: string; icon: ProductIcon; color: string }> = {
  Electronics: { blurb: "Audio, wearables and phones", icon: "headphones", color: "#2B2D8A" },
  Fashion: { blurb: "Everyday clothes and shoes", icon: "sneaker", color: "#B23A2E" },
  "Home & Kitchen": { blurb: "Lighting, mugs and plants", icon: "lamp", color: "#1F7A5C" },
  Beauty: { blurb: "Skin and body care", icon: "bottle", color: "#6B3B7A" },
  Sports: { blurb: "Training and outdoor gear", icon: "dumbbell", color: "#2F7FB5" },
  Books: { blurb: "Fiction, guides and journals", icon: "book", color: "#C98A00" },
};

/** Colours the admin can pick for a product picture. */
export const PRODUCT_COLORS = [
  { name: "Indigo", value: "#2B2D8A" },
  { name: "Marigold", value: "#C98A00" },
  { name: "Jade", value: "#1F7A5C" },
  { name: "Madder red", value: "#B23A2E" },
  { name: "Sky", value: "#2F7FB5" },
  { name: "Plum", value: "#6B3B7A" },
];

export const PRODUCT_ICONS: ProductIcon[] = [
  "headphones",
  "watch",
  "phone",
  "speaker",
  "tshirt",
  "sneaker",
  "bag",
  "lamp",
  "mug",
  "plant",
  "bottle",
  "dumbbell",
  "book",
];

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Aria Wireless Headphones",
    description:
      "Over-ear headphones with active noise cancellation, 30 hours of battery life and soft memory-foam ear cushions for long listening sessions.",
    price: 4499,
    category: "Electronics",
    icon: "headphones",
    color: "#2B2D8A",
    stock: 18,
    featured: true,
  },
  {
    id: "p2",
    name: "Pulse Smartwatch",
    description:
      "Tracks steps, heart rate and sleep. Water resistant up to 50 metres, with a bright AMOLED display and a 7-day battery.",
    price: 3299,
    category: "Electronics",
    icon: "watch",
    color: "#2F7FB5",
    stock: 9,
    featured: true,
  },
  {
    id: "p3",
    name: "Nova 5G Phone",
    description:
      "A 6.5-inch display, 128 GB storage and a 50 MP camera. Fast charging gets you to 50% in about 25 minutes.",
    price: 15999,
    category: "Electronics",
    icon: "phone",
    color: "#6B3B7A",
    stock: 6,
    featured: false,
  },
  {
    id: "p4",
    name: "Boom Mini Speaker",
    description:
      "Pocket-sized Bluetooth speaker with deep bass and 12 hours of playback. Splash-proof, so it is fine near the pool.",
    price: 1799,
    category: "Electronics",
    icon: "speaker",
    color: "#1F7A5C",
    stock: 0,
    featured: false,
  },
  {
    id: "p5",
    name: "Classic Cotton T-Shirt",
    description:
      "100% combed cotton tee with a relaxed fit. Pre-shrunk, so it keeps its shape after washing.",
    price: 599,
    category: "Fashion",
    icon: "tshirt",
    color: "#B23A2E",
    stock: 40,
    featured: true,
  },
  {
    id: "p6",
    name: "Stride Running Shoes",
    description:
      "Lightweight running shoes with a breathable mesh upper and cushioned sole for daily runs and walks.",
    price: 2499,
    category: "Fashion",
    icon: "sneaker",
    color: "#2F7FB5",
    stock: 14,
    featured: false,
  },
  {
    id: "p7",
    name: "Canvas Tote Bag",
    description:
      "Sturdy canvas tote with an inside zip pocket. Big enough for a laptop, groceries or a day at college.",
    price: 899,
    category: "Fashion",
    icon: "bag",
    color: "#C98A00",
    stock: 25,
    featured: false,
  },
  {
    id: "p8",
    name: "Glow Desk Lamp",
    description:
      "LED desk lamp with three brightness levels and a flexible neck. Uses less power than a regular bulb.",
    price: 1299,
    category: "Home & Kitchen",
    icon: "lamp",
    color: "#1F7A5C",
    stock: 11,
    featured: true,
  },
  {
    id: "p9",
    name: "Stoneware Coffee Mug",
    description: "Hand-glazed 350 ml stoneware mug. Microwave and dishwasher safe.",
    price: 349,
    category: "Home & Kitchen",
    icon: "mug",
    color: "#B23A2E",
    stock: 60,
    featured: false,
  },
  {
    id: "p10",
    name: "Snake Plant with Pot",
    description:
      "An easy-care indoor plant that needs water only once every two weeks. Comes in a ceramic pot.",
    price: 749,
    category: "Home & Kitchen",
    icon: "plant",
    color: "#2B2D8A",
    stock: 3,
    featured: false,
  },
  {
    id: "p11",
    name: "Aloe Face Moisturiser",
    description: "Light, non-sticky moisturiser with aloe vera and vitamin E for everyday use.",
    price: 449,
    category: "Beauty",
    icon: "bottle",
    color: "#6B3B7A",
    stock: 32,
    featured: true,
  },
  {
    id: "p12",
    name: "Herbal Shampoo",
    description: "Gentle shampoo made with amla and shikakai. Free from sulphates and parabens.",
    price: 299,
    category: "Beauty",
    icon: "bottle",
    color: "#1F7A5C",
    stock: 45,
    featured: false,
  },
  {
    id: "p13",
    name: "Adjustable Dumbbell Set",
    description:
      "A pair of dumbbells from 2.5 kg to 10 kg each, with secure locks and a rubber grip for home workouts.",
    price: 3999,
    category: "Sports",
    icon: "dumbbell",
    color: "#2B2D8A",
    stock: 7,
    featured: true,
  },
  {
    id: "p14",
    name: "Steel Water Bottle",
    description: "Insulated 1-litre bottle that keeps drinks cold for 24 hours and hot for 12.",
    price: 699,
    category: "Sports",
    icon: "bottle",
    color: "#2F7FB5",
    stock: 50,
    featured: false,
  },
  {
    id: "p15",
    name: "Beginner's Guide to Coding",
    description:
      "A friendly introduction to programming with JavaScript, with small exercises at the end of every chapter.",
    price: 499,
    category: "Books",
    icon: "book",
    color: "#C98A00",
    stock: 20,
    featured: false,
  },
  {
    id: "p16",
    name: "Dotted Journal",
    description: "A5 hardcover journal with 160 dotted pages, a ribbon bookmark and a back pocket.",
    price: 399,
    category: "Books",
    icon: "book",
    color: "#B23A2E",
    stock: 0,
    featured: false,
  },
];
