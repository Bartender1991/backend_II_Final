import { Schema, model } from "mongoose";

const productCollection = 'products';

const ProductSchema = new Schema({
    name: { type: String, require: true },
    price: { type: Number, require: true },
    description: { type: String, require: true },
    stock: { type: Number, require: true },
    active: { type: Boolean, default: true }
});

export const ProductModel = model(productCollection, ProductSchema);