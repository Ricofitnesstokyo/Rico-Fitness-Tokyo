import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import magicRoutes from './routes/magic.js';
import cartRoutes from './routes/cart.js';
import stripeRoutes from './routes/stripe.js';
import orderRoutes from "../routes/orders.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/magic', magicRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/stripe', stripeRoutes);
app.use("/api/orders", orderRoutes);

app.get('/ping', (req,res)=>res.json({ok:true}));

const MONGO = process.env.MONGO_URI;

if (!MONGO) {
  console.error("MONGO_URI is not defined");
  process.exit(1);
}

mongoose.connect(MONGO).then(()=> {
  console.log('Mongo connected');
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, ()=> console.log('Backend listening on', PORT));
}).catch(err=> {
  console.error('Mongo error', err);
});
