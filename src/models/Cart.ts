import mongoose, { type Model, Schema } from "mongoose";

type StoredCartItem = {
  productId: mongoose.Types.ObjectId;
  slug: string;
  name: string;
  image: string;
  priceMinor: number;
  currency: string;
  quantity: number;
};

type StoredCart = {
  userId: string;
  items: StoredCartItem[];
};

const cartItemSchema = new Schema<StoredCartItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  slug: { type: String, required: true, lowercase: true, trim: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  priceMinor: { type: Number, required: true, min: 0 },
  currency: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const cartSchema = new Schema<StoredCart>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { collection: "usercarts", timestamps: true },
);

const Cart = (mongoose.models.Cart as Model<StoredCart> | undefined) || mongoose.model<StoredCart>("Cart", cartSchema);

export default Cart;
