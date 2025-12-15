import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  magicToken: String,
  magicTokenExpiry: Date,
  preferences: { darkMode: { type: Boolean, default: false } },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.User || mongoose.model('User', schema);
