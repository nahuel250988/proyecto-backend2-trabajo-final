import { Router } from 'express';
import sessionController from '../controllers/session.controller.js';
import passport from 'passport';

const router = Router();

router.post('/register', sessionController.register.bind(sessionController));

router.post(
  '/login', 
  passport.authenticate('login', { session: false }), 
  sessionController.login.bind(sessionController)
);

router.get(
  '/current', 
  passport.authenticate('jwt', { session: false }), 
  sessionController.getCurrentUser.bind(sessionController)
);

router.post('/forgot-password', sessionController.sendPasswordRecoveryEmail.bind(sessionController));

router.post('/reset-password', sessionController.resetPassword.bind(sessionController));

export default router;