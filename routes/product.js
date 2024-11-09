const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const { authenticate } = require('../middlewares/auth');

router.post('/products', authenticate, productController.addProduct);
router.get('/products', productController.getProducts);

module.exports = router;
