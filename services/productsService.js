const productsModel = require('../models/productsModel');
const { throwInvalidIdError } = require('./utils');

const productsService = {
  async verifyId(id) {
    const result = id !== Number(id);
    if (!result) throwInvalidIdError('Invalid ID');
    return id;
  },
  
  async getAll() {
    const products = await productsModel.getAll();
    return products;
  },

  async getById(id) {
    const product = await productsModel.getById(id);
    return product;
  },
};

module.exports = productsService;