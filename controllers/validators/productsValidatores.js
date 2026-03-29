// todo

const Joi = require('joi');

// Create product validation schema
const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(200).required(),
  description: Joi.string().min(10).max(1000),
  price: Joi.number().positive().required(),
  categoryId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
});

// Update product validation schema
const updateProductSchema = Joi.object({
  name: Joi.string().min(2).max(200),
  description: Joi.string().min(10).max(1000),
  price: Joi.number().positive(),
  categoryId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
});

module.exports = { createProductSchema, updateProductSchema };