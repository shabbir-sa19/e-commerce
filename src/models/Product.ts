import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  category: { type: String, required: true, index: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  priceMinor: { type: Number, required: true, min: 0 },
  currency: { type: String, required: true, default: "USD", uppercase: true },
  sku: { type: String, required: true, unique: true, uppercase: true },
  stock: { type: Number, required: true, min: 0, default: 0 },
  featured: { type: Boolean, default: false, index: true },
  status: { type: String, enum: ["active", "draft"], default: "active", index: true },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;