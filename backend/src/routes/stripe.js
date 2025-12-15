import express from 'express';
import Stripe from 'stripe';
import Product from '../models/Product.js';
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-08-16' });

router.post('/create-checkout-session', async (req,res) => {
  const { items, customer_email } = req.body;
  const line_items = [];
  for(const it of items) {
    let priceId = it.price;
    if(!priceId || !priceId.startsWith('price_')) {
      const p = await Product.findOne({ sku: it.price });
      if(p && p.stripe_price_id) priceId = p.stripe_price_id;
    }
    if(!priceId) continue;
    line_items.push({ price: priceId, quantity: it.quantity || 1 });
  }
  if(!line_items.length) return res.status(400).json({ error:'no items' });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items,
    ...(customer_email?{ customer_email }: {}),
    success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/cancel`
  });
  res.json({ url: session.url });
});

export default router;
