import { CartItem } from "@/types/types";
import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema<CartItem>({
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  priceMinor: { type: Number, required: true, min: 0 },
  currency: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 }
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartItemSchema);

export default Cart;
