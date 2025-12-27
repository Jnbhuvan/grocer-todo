import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    check: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
