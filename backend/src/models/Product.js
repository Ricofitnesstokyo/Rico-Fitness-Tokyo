import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  id: String,
  sku: String,
  title_fr: String,
  title_en: String,
  title_jp: String,
  description_fr: String,
  description_en: String,
  description_jp: String,
  price: Number,
  stripe_price_id: String,
  stock: Number,
  img: String,
  category: String
});
export default mongoose.models.Product || mongoose.model('Product', schema);
