const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoutes = Router();

// get all products

productsRoutes.get('/', productsController.getAll);

productsRoutes.get('/:id', productsController.getById);

productsRoutes.post('/', productsController.add);

productsRoutes.put('/:id', productsController.edit);

module.exports = productsRoutes;
