const express = require('express')
const router = express.Router()
const productsController = require('../controllers/products')

router.get('/products', productsController.getAllProducts)
router.post('/products', productsController.newProduct)
router.put('/products/add/:id', productsController.addProductToList)
router.put('/products/remove/:id', productsController.removeProductFromList)
router.delete('/products/:id', productsController.deleteOneProduct)

module.exports = router