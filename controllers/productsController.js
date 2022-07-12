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
    const { error, value } = productsService.validateBodyAdd(req.body);
  
    console.log(value)
    console.log(error)
    
    if (error) {
      if (error.details[0].message === '"name" is required') {
        return res.status(400).json({ message: '"name" is required' });
      }

      if (error.details[0].message === '"name" length must be at least 5 characters long') {
        return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
      }
    }
  
    try {
      const id = await productsService.add(value);

      const product = await productsService.getById(id);

      return res.status(201).json(product);
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
};

module.exports = productsController;