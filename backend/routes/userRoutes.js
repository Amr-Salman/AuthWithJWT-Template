import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProflie,
} from '../controllers/userController.js';
import { protectMiddleware } from '../middlewares/protectMiddleware.js';

// Initialize the router
const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);

router
  .route('/profile', logoutUser)
  .get(protectMiddleware, getUserProfile)
  .put(protectMiddleware, updateUserProflie);

export default router;
