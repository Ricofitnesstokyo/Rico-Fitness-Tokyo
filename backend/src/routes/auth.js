import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const router = express.Router();

router.post('/signup', async (req,res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({ error:'email+password required' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error:'exists' });
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed });
  res.json({ ok:true });
});

router.post('/login', async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error:'invalid' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ error:'invalid' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
  res.json({ token });
});

router.get('/me', async (req,res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error:'no auth' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    const user = await User.findById(payload.id).select('-password -magicToken -magicTokenExpiry');
    res.json(user);
  } catch (err) {
    res.status(401).json({ error:'invalid token' });
  }
});

export default router;
