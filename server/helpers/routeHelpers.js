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
      display_name: Joi.string().alphanum().trim(),
      commercial: Joi.boolean().default(false),
      ustid: Joi.string(),
      insurance: Joi.string(),
      gender: Joi.string().allow('Herr', 'Frau'),
    }),
    emailAvailableSchema: Joi.object().keys({
      email: Joi.string().email().trim().required()
    })
  }
}