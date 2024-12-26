import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { authRateLimiter } from '../middlewares/authMiddleware.js';


const router = Router();

router.post('/register', authRateLimiter, AuthController.register);
router.post('/login', authRateLimiter, AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/refresh-token', AuthController.refreshToken);

export default router;
