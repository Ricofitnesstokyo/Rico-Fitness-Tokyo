import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

router.get('/', async (req,res) => {
  const { search } = req.query;
  let query = {};
  if (search) {
    const s = new RegExp(search, 'i');
    query = {$or:[
      { sku: s },
      { title_fr: s },
      { title_en: s },
      { description_fr: s },
      { description_en: s }
    ]};
  }
  const products = await Product.find(query).lean();
  res.json(products);
});

router.get('/:sku', async (req,res) => {
  const p = await Product.findOne({ sku: req.params.sku }).lean();
  if(!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

export default router;
