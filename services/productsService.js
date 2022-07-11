const Joi = require('joi');
const productsModel = require('../models/productsModel');
const { throwInvalidIdError, useSchema } = require('./utils');

const productsService = {
  validateBodyAdd: useSchema(Joi.object({
    name: Joi.string().required().max(30).min(5)
      .messages({
      'any.required': '"name" is required',
      'array.min': '"name" length must be at least 5 characters long',
    }),
  })),

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

  async add(data) {
    const id = await productsModel.add(data);
    return id;
  },
};

module.exports = productsService;