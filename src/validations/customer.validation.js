const { Joi } = require("celebrate");

const createCustomer = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    gender: Joi.string().required().valid("Male", "Female", "Others"),
    addresses: Joi.array()
      .required()
      .items(
        Joi.object({
          street: Joi.string().required(),
          city: Joi.string().required(),
          country: Joi.string().required(),
        })
      ),
  }),
};

module.exports = {
  createCustomer,
};
