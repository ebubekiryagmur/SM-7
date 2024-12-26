import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export class JWTService {
  static generateTokens(userId) {
    const accessToken = jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId }, config.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  static verifyToken(token, isRefresh = false) {
    return jwt.verify(
      token,
      isRefresh ? config.JWT_REFRESH_SECRET : config.JWT_SECRET
    );
  }
}
 