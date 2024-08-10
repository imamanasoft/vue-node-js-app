// server/models/Product.js

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01, // Enforce a minimum positive price
  },
  category: {
    type: String,
    ref: "Category", // Reference the Category model (optional)
  },
  image: [
    {
      data: Buffer,
      type: String,
    },
  ],
  stock: {
    type: Number,
    min: 0, // Enforce non-negative stock
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Optional: Add indexes for frequently queried fields (e.g., name, price)
productSchema.index({ name: "text" }); // Full-text search index for name
productSchema.index({ price: 1 }); // Ascending index for price filtering

const Product = mongoose.model("Product", productSchema);

export default Product;
