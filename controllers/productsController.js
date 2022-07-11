const productsService = require('../services/productsService');

const productsController = {

  async getAll(_req, res) {
    const products = await productsService.getAll();

    if (!products) {
      res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(products);
  },

  async getById(req, res) {
    const { id } = await productsService.verifyId(req.params);

    const product = await productsService.getById(id);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  },

  async add(req, res) {
    const data = await productsService.validateBodyAdd(req.body);
    
    if (data.details[0].message === '"name" is required') {
      res.status(400).json({ message: '"name" is required' });
    }

    if (data.details[0].message === '"name" length must be at least 5 characters long') {
      res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    }
    
    const id = await productsService.add(data);


    const product = await productsService.getById(id);

    res.status(201).json(product);
  },
};

module.exports = productsController;