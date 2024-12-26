import { JWTService } from '../services/JWTService.js';
import rateLimit from 'express-rate-limit';


export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token gerekli.' });

  try {
    const decoded = JWTService.verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: 'Geçersiz veya süresi dolmuş token.' });
  }
};


export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: { message: 'Çok fazla istek yapıldı, lütfen daha sonra tekrar deneyin.' },
});
