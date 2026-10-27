import type { CheckoutForm, FormErrors } from "@/types";

// Form validation. Each function returns an object of error messages.
// An empty object means the form is valid.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[6-9]\d{9}$/; // 10-digit Indian mobile number
const PINCODE_PATTERN = /^[1-9]\d{5}$/; // 6-digit PIN code

export function validateCheckout(form: CheckoutForm): FormErrors<CheckoutForm> {
  const errors: FormErrors<CheckoutForm> = {};

  if (form.fullName.trim().length < 2) errors.fullName = "Enter your full name.";
  if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = "Enter a valid email, like name@example.com.";
  if (!PHONE_PATTERN.test(form.phone.trim())) errors.phone = "Enter a 10-digit mobile number.";
  if (form.address.trim().length < 5) errors.address = "Enter your house number and street.";
  if (form.city.trim().length < 2) errors.city = "Enter your city.";
  if (!PINCODE_PATTERN.test(form.pincode.trim())) errors.pincode = "Enter a 6-digit PIN code.";

  return errors;
}

/** What the admin types into the product form. Numbers are strings while typing. */
export interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  icon: string;
  color: string;
  featured: boolean;
}

export function validateProduct(values: ProductFormValues): FormErrors<ProductFormValues> {
  const errors: FormErrors<ProductFormValues> = {};
  const price = Number(values.price);
  const stock = Number(values.stock);

  if (values.name.trim().length < 3) errors.name = "Name must be at least 3 characters.";
  if (values.name.trim().length > 60) errors.name = "Name must be 60 characters or fewer.";
  if (values.description.trim().length < 10) errors.description = "Description must be at least 10 characters.";
  if (values.price.trim() === "" || !Number.isInteger(price) || price < 1) {
    errors.price = "Price must be a whole number of at least ₹1.";
  } else if (price > 500000) {
    errors.price = "Price must be ₹5,00,000 or less.";
  }
  if (!values.category) errors.category = "Choose a category.";
  if (values.stock.trim() === "" || !Number.isInteger(stock) || stock < 0) {
    errors.stock = "Stock must be a whole number, 0 or more.";
  }

  return errors;
}

export function hasErrors(errors: object): boolean {
  return Object.keys(errors).length > 0;
}
