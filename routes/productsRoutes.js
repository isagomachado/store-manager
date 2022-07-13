const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoutes = Router();

productsRoutes.get('/', productsController.getAll);

productsRoutes.get('/:id', productsController.getById);

productsRoutes.post('/', productsController.add);

productsRoutes.put('/:id', productsController.edit);

productsRoutes.delete('/:id', productsController.remove);

module.exports = productsRoutes;
