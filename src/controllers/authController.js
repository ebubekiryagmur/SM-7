import bcrypt from 'bcryptjs'; 
import { UserModel } from '../models/userModel.js';
import { JWTService } from '../services/JWTService.js';

export const AuthController = {
  async register(req, res) {
    const { email, password } = req.body;

    if (!email || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ message: 'Geçersiz e-posta.' });
    }

    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email zaten mevcut.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    const user = await UserModel.create(email, hashedPassword);
    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi.', userId: user.id });
  },

  async login(req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    const tokens = JWTService.generateTokens(user.id);
    res.json(tokens);
  },

  async logout(req, res) {
    res.json({ message: 'Çıkış işlemi başarılı.' });
  },

  async refreshToken(req, res) {
    const { refreshToken } = req.body;

    try {
      const payload = JWTService.verifyToken(refreshToken, true);
      const tokens = JWTService.generateTokens(payload.userId);
      res.json(tokens);
    } catch {
      res.status(401).json({ message: 'Geçersiz veya süresi dolmuş yenileme jetonu.' });
    }
  },
};
