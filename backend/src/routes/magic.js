import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/User.js';
const router = express.Router();

router.post('/request', async (req,res) => {
  const { email } = req.body;
  if(!email) return res.status(400).json({ error:'email required' });
  let user = await User.findOne({ email });
  if(!user) user = await User.create({ email });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '15m' });
  const link = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth-magic-success?token=${token}`;
  // send mail if SMTP configured, otherwise log
  if(process.env.SMTP_HOST) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    await transporter.sendMail({ from: process.env.EMAIL_FROM, to: email, subject: 'Votre lien VeloParts', html: `<a href="${link}">${link}</a>` });
  } else {
    console.log('[MAGIC LINK]', link);
  }
  res.json({ success:true });
});

export default router;
