// localStorage helpers.
// localStorage keeps data in THIS browser only. It is demo storage,
// not a database: other people and other devices will not see it.

/** Read a JSON value. Returns the fallback if nothing is saved or the data is broken. */
export function loadFromStorage<T>(key: string, fallback: T): T {
  // localStorage does not exist while Next.js renders on the server.
  if (typeof window === "undefined") return fallback;
  try {
    const saved = window.localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
}

/** Save a value as JSON. Fails quietly (e.g. private mode or storage full). */
export function saveToStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Nothing else to do: the app still works, it just won't remember the data.
  }
}

export const STORAGE_KEYS = {
  cart: "nexora-cart",
  products: "nexora-products",
  lastOrder: "nexora-last-order",
} as const;
