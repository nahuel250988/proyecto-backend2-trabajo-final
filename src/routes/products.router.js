import { Router } from 'express';
import productController from '../controllers/product.controller.js';
import { checkRole } from '../utils/auth.middleware.js';
import passport from 'passport';

const router = Router();

router.get('/', productController.getProducts.bind(productController));

router.get('/:pid', productController.getProductById.bind(productController));

router.post(
  '/', 
  passport.authenticate('jwt', { session: false }), 
  checkRole(['admin']), 
  productController.createProduct.bind(productController)
);

router.put(
  '/:pid', 
  passport.authenticate('jwt', { session: false }), 
  checkRole(['admin']), 
  productController.updateProduct.bind(productController)
);

router.delete(
  '/:pid', 
  passport.authenticate('jwt', { session: false }), 
  checkRole(['admin']), 
  productController.deleteProduct.bind(productController)
);

export default router;