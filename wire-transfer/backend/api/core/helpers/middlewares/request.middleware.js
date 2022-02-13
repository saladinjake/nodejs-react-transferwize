import Joi from 'joi';
import Schemas from './validatorSchema/bodySchemas';

export default () => {
  // enabled HTTP methods for request data validation
  const supportedMethods = ['post', 'put', 'patch'];
  // Joi validation options
  const validationOptions = { 
    abortEarly: false,
    allowUnknown: true, 
    stripUnknown: true 
  };
  return (req, res, next) => {
    const route = req.route.path;
    const method = req.method.toLowerCase();
    if (supportedMethods.includes(method) && route in Schemas) {
    
      const schema = Schemas[route];
      if (schema) {
        return Joi.validate(req.body, schema, validationOptions, (err, data) => {
          if (err) {
            const SimplifiedError = {
              status: 400,
              error: err.details ? err.details[0].message.replace(/['"]/g, '') : err.message,
            };
            res.status(400).json(SimplifiedError);
          } else {
          // Replace req.body with the data after Joi validation
            req.body = data;
            return next();
          }
        });
      }
    }
    return next();
  };
};
