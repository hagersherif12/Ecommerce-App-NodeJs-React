const Joi = require('joi');

const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(), 
  description: Joi.string().min(10).max(500)
});

// Update category validation schema
const updateCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  description: Joi.string().max(500)
});

module.exports = { createCategorySchema, updateCategorySchema };