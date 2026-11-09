import { type Customer } from "@/types/types";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const customerSchema = new Schema<Customer>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true, },
    emailVerified: { type: Boolean, default: false },
    avatar: {
      type: String,
      match: [
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
        "Not a valid URL!",
      ],
    },
  },
  { timestamps: true },
);
customerSchema.pre("save", async function () {
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
})

customerSchema.methods.validatePassword = async function (password: string) {
  return bcrypt.compare(password, this.passwordHash);
};

const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
