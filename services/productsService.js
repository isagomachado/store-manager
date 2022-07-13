const Joi = require('joi');
const productsModel = require('../models/productsModel');
const { throwInvalidIdError, useSchema, throwNotFoundError } = require('./utils');

const productsService = {
  validateBody: useSchema(Joi.object({
    name: Joi.string().required().max(30).min(5)
      .messages({
      'any.required': '"name" is required',
      'array.min': '"name" length must be at least 5 characters long',
    }),
  })),

  // validateBodyAEdit: useSchema(Joi.object({
  //   name: Joi.string().max(30).min(5)
  //     .messages({
  //     'any.required': '"name" is required',
  //     'array.min': '"name" length must be at least 5 characters long',
  //   }),
  // }).min(1)),

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

  async edit(id, name) {
    await productsModel.edit(id, name);
  },

  async checkExists(id) {
    const exists = await productsModel.exists(id);
    if (!exists) throwNotFoundError('Product not found');
  },

};

module.exports = productsService;