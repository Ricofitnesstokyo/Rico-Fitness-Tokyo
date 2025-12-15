import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  userId: String,
  items: Array,
  updatedAt: { type: Date, default: Date.now }
});
export default mongoose.models.Cart || mongoose.model('Cart', schema);
