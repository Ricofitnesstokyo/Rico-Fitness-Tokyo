import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
dotenv.config();
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/veloparts';
await mongoose.connect(MONGO);
console.log('Connected to Mongo, seeding products...');

const products = [
  // All Mountain / VTT
  { id:'MT-001', sku:'MT-001', title_fr:'Cadre VTT All Mountain carbone', title_en:'All Mountain Carbon Frame', title_jp:'オールマウンテン カーボンフレーム', description_fr:'Cadre carbone léger et résistant', description_en:'Lightweight carbon frame', description_jp:'軽量カーボンフレーム', price:499.0, stock:5, img:'https://picsum.photos/seed/mtframe/400/300', category:'MT' },
  { id:'MT-002', sku:'MT-002', title_fr:'Suspension fourche 160mm', title_en:'Fork Suspension 160mm', title_jp:'フロントサスペンション 160mm', description_fr:'Fourche pour All Mountain', description_en:'Fork for All Mountain', description_jp:'オールマウンテン用フォーク', price:299.0, stock:8, img:'https://picsum.photos/seed/mtfork/400/300', category:'MT' },

  // Gravel
  { id:'GR-001', sku:'GR-001', title_fr:'Pneu Gravel 700x40', title_en:'Gravel Tyre 700x40', title_jp:'グラベルタイヤ 700x40', description_fr:'Pneu polyvalent', description_en:'Versatile tyre', description_jp:'多用途タイヤ', price:49.0, stock:20, img:'https://picsum.photos/seed/gravel/400/300', category:'GR' },

  // Ville
  { id:'CT-001', sku:'CT-001', title_fr:'Cintre urbain aluminium', title_en:'Urban Handlebar Aluminium', title_jp:'アルミ製シティハンドル', description_fr:'Cintre confortable', description_en:'Comfort handlebar', description_jp:'快適なハンドル', price:29.0, stock:25, img:'https://picsum.photos/seed/citybar/400/300', category:'CT' },

  // BMX
  { id:'BMX-001', sku:'BMX-001', title_fr:'Cadre BMX acier 20"', title_en:'BMX Steel Frame 20"', title_jp:'BMX スチールフレーム 20"', description_fr:'Cadre solide', description_en:'Sturdy frame', description_jp:'頑丈なフレーム', price:199.0, stock:10, img:'https://picsum.photos/seed/bmxframe/400/300', category:'BMX' },

  // Maintenance / Accessoires
  { id:'MTN-001', sku:'MTN-001', title_fr:'Lubrifiant chaîne huile légère 120ml', title_en:'Chain Lube 120ml', title_jp:'チェーン潤滑油 120ml', description_fr:'Lubrifiant universel', description_en:'Universal lube', description_jp:'汎用潤滑剤', price:9.0, stock:50, img:'https://picsum.photos/seed/lube/400/300', category:'MTN' }
];

await Product.deleteMany({});
await Product.insertMany(products);
console.log('Seed done. Products inserted:', products.length);
process.exit(0);
