const messages = require("../config/messages");
const customerService = require("../services/customer.service");

const register = async (req, res) => {
  return res.status(200).send("d");
};

const createCustomer = async (req, res) => {
  // #swagger.tags = ['Customer']
  // #swagger.description = 'Endpoint to create a customer.'
  /* #swagger.parameters['customer'] = {
            in: 'body',
            description: 'Adding new customer.',
            schema: { $ref: '#/definitions/Customer' }
        } */
  /* #swagger.responses[200] = {
               description: 'Customer successfully response.',
                schema: {
                   message: 'Customer successfully created.',
                   data: {$ref: '#/definitions/Customer'}
               }
       } */
  try {
    const customer = req.body;

    const newCustomer = await customerService.createCustomer(customer);

    return res.successResponse(newCustomer, {
      message: messages.customer.createdSuccess,
    });
  } catch (err) {
    return res.errorResponse(err, {
      message:
        err.name == "SequelizeUniqueConstraintError"
          ? "Duplicate entry for email"
          : err.message,
    });
  }
};

const getAllCustomer = async (req, res) => {
  // #swagger.tags = ['Customer']
  // #swagger.description = 'Endpoint to get all customer.'

  /* #swagger.responses[200] = {
               description: 'Customer successfully response.',
                schema: {
                   message: 'Customer list found.',
                   data: [{$ref: '#/definitions/Customer'}]
               }
       } */
  try {
    const getAllCustomer = await customerService.getAllCustomer();

    return res.successResponse(getAllCustomer, {
      message: messages.customer.getCustomer,
    });
  } catch (err) {
    return res.errorResponse(err);
  }
};

const getCustomer = async (req, res) => {
  // #swagger.tags = ['Customer']
  // #swagger.description = 'Endpoint to get customer.'
  //  #swagger.parameters['id'] = { description: 'Customer Id' }
  /* #swagger.responses[200] = {
               description: 'Customer successfully response.',
                schema: {
                   message: 'Customer found.',
                   data: {$ref: '#/definitions/Customer'}
               }
       } */
  try {
    const customerId = req.params.id;
    const getCustomer = await customerService.findCustomer(customerId);

    return res.successResponse(getCustomer, {
      message: messages.customer.findSuccess,
    });
  } catch (err) {
    return res.errorResponse(err);
  }
};

const deleteCustomer = async (req, res) => {
  // #swagger.tags = ['Customer']
  // #swagger.description = 'Endpoint to delete customer.'
  //  #swagger.parameters['id'] = { description: 'Customer Id' }
  /* #swagger.responses[200] = {
               description: 'Customer successfully response.',
                schema: {
                   message: 'Customer deleted successfully.',
                   data: {$ref: '#/definitions/Customer'}
               }
       } */
  try {
    const customerId = req.params.id;
    const getCustomer = await customerService.deleteCustomer(customerId);

    return res.successResponse(getCustomer, {
      message: messages.customer.deleteSuccess,
    });
  } catch (err) {
    return res.errorResponse(err);
  }
};

const updateCustomer = async (req, res) => {
  // #swagger.tags = ['Customer']
  // #swagger.description = 'Endpoint to delete customer.'
  //  #swagger.parameters['id'] = { description: 'Customer Id' }
  /* #swagger.parameters['customer'] = {
            in: 'body',
            description: 'Adding new customer.',
            schema: { $ref: '#/definitions/Customer' }
        } */
  /* #swagger.responses[200] = {
               description: 'Customer successfully response.',
                schema: {
                   message: 'Customer deleted successfully.',
                   data: {$ref: '#/definitions/Customer'}
               }
       } */
  try {
    const customerId = req.params.id;
    const customer = req.body;
    const updateCustomer = await customerService.updateCustomer(
      customerId,
      customer
    );

    return res.successResponse(updateCustomer, {
      message: messages.customer.updateSuccess,
    });
  } catch (err) {
    console.log("err", err);
    return res.errorResponse(err, {
      statusCode: 400,
      message: "Email duplicate error",
    });
  }
};

module.exports = {
  register,
  createCustomer,
  getAllCustomer,
  deleteCustomer,
  getCustomer,
  updateCustomer,
};
