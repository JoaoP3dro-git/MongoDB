const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController');

router
    .post('/', ProductController.create)
    .get('/:id?', ProductController.getProduct)
    .delete('/:id', ProductController.delete)
    .put('/:id', ProductController.update)

module.exports = router