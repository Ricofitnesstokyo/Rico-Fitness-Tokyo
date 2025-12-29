import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Panier vide" });
    }

    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: "Produit introuvable" });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: "Stock insuffisant" });
      }
      product.stock -= item.quantity;
      await product.save();
      total += product.price * item.quantity;
    }

    const order = await Order.create({ items, total });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Erreur commande" });
  }
});

router.get("/", async (req, res) => {
  const orders = await Order.find()
    .populate("items.product")
    .sort({ createdAt: -1 });
  res.json(orders);
});

export default router;
