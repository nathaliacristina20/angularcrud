import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    departments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Product", ProductSchema);
