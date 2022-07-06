const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoutes = Router();

// get all products

productsRoutes.get('/', productsController.getAll);

productsRoutes.get('/:id', productsController.getById);

module.exports = productsRoutes;
