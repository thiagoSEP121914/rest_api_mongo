import { timeStamp } from "console";
import { config } from "dotenv";
import { trim } from "lodash";
import { Document, model, Schema } from "mongoose";
import { string } from "zod";
import { required } from "zod/v4/core/util.cjs";

export interface IProduct {
  idProduct: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  unitOfMeasure: string;
  createdAt: Date;
  supplier: string;
}

export interface ProductDocument extends IProduct, Document {}

const ProductSchema = new Schema<ProductDocument>(
  {
    idProduct: { type: Number, required: true, unique: true },
    name: { type: String, reequired: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    stockQuantity: { type: Number, required: true, min: 0, default: 0 },
    unitOfMeasure: { type: String, required: true },
    supplier: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const ProductModel = model<ProductDocument>("Product", ProductSchema);
