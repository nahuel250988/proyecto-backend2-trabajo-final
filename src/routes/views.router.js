import { Router } from 'express';
import viewController from '../controllers/view.controller.js';
import passport from 'passport';

const router = Router();

router.get(
  '/products', 
  passport.authenticate('jwt', { session: false }),
  viewController.getProductsView.bind(viewController)
);

router.get(
  '/carts/:cid', 
  passport.authenticate('jwt', { session: false }),
  viewController.getCartView.bind(viewController)
);

router.get('/login', viewController.getLoginView.bind(viewController));

router.get('/register', viewController.getRegisterView.bind(viewController));

export default router;