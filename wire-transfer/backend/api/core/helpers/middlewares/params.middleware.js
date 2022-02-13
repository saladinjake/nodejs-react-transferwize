import Joi from 'joi';
import Schemas from './validatorSchema/paramsSchemas';

export default () => {
  const supportedMethods = ['get', 'post', 'patch', 'delete'];
  const validationOptions = { abortEarly: false, allowUnknown: true, stripUnknown: true };
  // return the validation middleware
  return (req, res, next) => {
    const route = req.route.path;
    const method = req.method.toLowerCase();
    if (supportedMethods.includes(method) && route in Schemas) {
    // get schema for the current route
      const schema = Schemas[route];
      if (schema) {
        return Joi.validate(req.params, schema, validationOptions, (err, data) => {
          if (err) {
            const SimplifiedError = {
              status: 400,
              error: err.details ? err.details[0].message.replace(/['"]/g, '') : err.message,
            };

            res.status(400).json(SimplifiedError);
          } else {
            req.params = data;
            return next();
          }
        });
      }
    }
    return next();
  };
};
