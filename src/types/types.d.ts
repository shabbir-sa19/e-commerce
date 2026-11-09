import mongoose from "mongoose";

export type ProductCategory = {
  id?: string;
  name: string;
}
export type Product = {
  id?: string | mongoose.Types.ObjectId;
  name: string;
  slug: string;
  category: ProductCategory;
  description: string;
  image: string;
  mrp: number;
  priceMinor: number;
  currency: string;
  sku: string;
  stock: number;
  featured: boolean;
};

export type CartItem = {
  id?: string | mongoose.Types.ObjectId;
  slug: string;
  name: string;
  image: string;
  priceMinor: number;
  currency: string;
  quantity: number;
};

export type Customer = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  passwordHash: string;
  avatar: string;
  lastUpdate: string;
  registrationDate: string;
}
