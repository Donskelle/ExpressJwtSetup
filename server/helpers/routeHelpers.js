const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().trim().required(),
      password: Joi.string().required()
    }),
    signupSchema: Joi.object().keys({
      email: Joi.string().email().trim().required(),
      password: Joi.string().required(),
      first_name: Joi.string().trim().required(),
      last_name: Joi.string().trim().required(),
      birth_year: Joi.number().greater(1900).max((new Date()).getFullYear()-16).required(),
      commercial: Joi.boolean().default(false),
      ustid: Joi.string(),
      insurance: Joi.string(),
      gender: Joi.string().allow('Herr', 'Frau').required(),
      description: Joi.string(),
      company: Joi.object().keys({
        name: Joi.string(),
        address: Joi.object().keys({
          street: Joi.string(),
          city: Joi.string(),
          zip: Joi.string().min(4).max(5),
        }), 
      }),
    }),
    emailAvailableSchema: Joi.object().keys({
      email: Joi.string().email().trim().required()
    }),
    updateUserSchema: Joi.object().keys({
      first_name: Joi.string().trim(),
      last_name: Joi.string().trim(),
      birth_year: Joi.number().greater(1900).max((new Date()).getFullYear()-16),
      display_name: Joi.string().alphanum().trim(),
      commercial: Joi.boolean(),
      ustid: Joi.string(),
      description: Joi.string(),
      insurance: Joi.string(),
      gender: Joi.string().allow('Herr', 'Frau'),
      company: Joi.object().keys({
        name: Joi.string(),
        address: Joi.object().keys({
          street: Joi.string(),
          city: Joi.string(),
          zip: Joi.string().min(5).max(5),
        }), 
      }),
    }),
  }
}