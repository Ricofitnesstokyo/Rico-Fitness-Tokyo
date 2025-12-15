import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  sessionId: String,
  email: String,
  amount: Number,
  currency: String,
  items: Array,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.Order || mongoose.model('Order', schema);
