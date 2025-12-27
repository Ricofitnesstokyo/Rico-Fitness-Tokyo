import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  brand: String,
  price: Number,
  stock: Number,
  image: String
});

export default mongoose.model("Product", ProductSchema);
