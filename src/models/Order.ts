import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  sku: { type: String, required: true },
  priceMinor: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const orderSchema = new Schema({
  userId: { type: String, required: true, index: true },
  email: { type: String, required: true },
  items: { type: [orderItemSchema], required: true },
  currency: { type: String, required: true },
  subtotalMinor: { type: Number, required: true },
  status: {
    type: String,
    enum: ["payment_required", "paid", "cancelled"],
    default: "payment_required",
    index: true
  },
  shippingAddress: {
    name: { type: String, required: true },
    line1: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  }
}, { timestamps: true });

orderSchema.index({ userId: 1, createdAt: -1 });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
