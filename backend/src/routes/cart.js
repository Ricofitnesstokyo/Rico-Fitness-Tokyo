import express from 'express';
import Cart from '../models/Cart.js';
const router = express.Router();

router.post('/save', async (req,res) => {
  const { userId, items } = req.body;
  if(!userId) return res.status(400).json({ error:'userId required' });
  let cart = await Cart.findOne({ userId });
  if(!cart) cart = await Cart.create({ userId, items });
  else { cart.items = items; cart.updatedAt = Date.now(); await cart.save(); }
  res.json({ ok:true });
});

router.get('/:userId', async (req,res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart ? cart.items : []);
});

export default router;
