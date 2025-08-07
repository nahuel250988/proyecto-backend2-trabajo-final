import { Router } from 'express';
import cartController from '../controllers/cart.controller.js';
import passport from 'passport';

const router = Router();

router.post('/', cartController.createCart.bind(cartController));

router.get('/:cid', cartController.getCart.bind(cartController));

router.post(
  '/:cid/products/:pid', 
  passport.authenticate('jwt', { session: false }),
  cartController.addProductToCart.bind(cartController)
);

router.put(
  '/:cid', 
  passport.authenticate('jwt', { session: false }),
  cartController.updateCartProducts.bind(cartController)
);

router.put(
  '/:cid/products/:pid', 
  passport.authenticate('jwt', { session: false }),
  cartController.updateProductQuantity.bind(cartController)
);

router.delete(
  '/:cid/products/:pid', 
  passport.authenticate('jwt', { session: false }),
  cartController.deleteProductFromCart.bind(cartController)
);

router.delete(
  '/:cid', 
  passport.authenticate('jwt', { session: false }),
  cartController.clearCart.bind(cartController)
);

export default router;