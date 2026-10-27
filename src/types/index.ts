// Shared TypeScript types used across the whole app.
// Keeping them in one file makes it easy to see the "shape" of our data.

/** The product categories shown in the store. */
export type Category = "Electronics" | "Fashion" | "Home & Kitchen" | "Beauty" | "Sports" | "Books";

/**
 * Which drawing to use for a product's picture.
 * We draw product pictures with SVG (see ProductImage.tsx),
 * so there are no image files that could break or go missing.
 */
export type ProductIcon =
  | "headphones"
  | "watch"
  | "phone"
  | "speaker"
  | "tshirt"
  | "sneaker"
  | "bag"
  | "lamp"
  | "mug"
  | "plant"
  | "bottle"
  | "dumbbell"
  | "book";

export interface Product {
  id: string;
  name: string;
  description: string;
  /** Price in Indian rupees (whole numbers). */
  price: number;
  category: Category;
  icon: ProductIcon;
  /** Background colour of the product picture, e.g. "#2B2D8A". */
  color: string;
  /** How many units are available to buy. 0 means out of stock. */
  stock: number;
  featured: boolean;
}

/** One line in the shopping cart. We store only the id and quantity. */
export interface CartItem {
  productId: string;
  quantity: number;
}

/** The values the customer types into the checkout form. */
export interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

/** A product as it was when the order was placed (price can change later). */
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: CheckoutForm;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

/** Error messages for a form, one optional message per field. */
export type FormErrors<T> = Partial<Record<keyof T, string>>;
