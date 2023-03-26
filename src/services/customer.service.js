const { Customer, Address } = require("../models");

const createCustomer = async (customer) => {
  try {
    const newCustomer = await Customer.create(customer);
    if (customer.addresses && customer.addresses.length) {
      const newAddress = customer.addresses.map((address) => ({
        ...address,
        customerId: newCustomer.id,
      }));
      await Address.bulkCreate(newAddress);
    }
    return await findCustomer(newCustomer.id);
  } catch (error) {
    throw new Error(
      error.name == "SequelizeUniqueConstraintError"
        ? "Duplicate entry for email"
        : error.message
    );
  }
};

const getAllCustomer = async () => {
  try {
    const allCustomers = await Customer.findAll({
      include: { model: Address, as: "addresses" },
    });

    return allCustomers;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCustomer = async (id) => {
  try {
    const customer = await findCustomer(id);
    if (!customer) {
      throw new Error("Customer not found");
    }
    await Customer.destroy({ where: { id } });

    return customer;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findCustomer = async (customerId) => {
  try {
    const customer = await Customer.findByPk(customerId, {
      include: { model: Address, as: "addresses" },
    });
    return customer;
  } catch (error) {
    throw error;
  }
};

const updateCustomer = async (customerId, customer) => {
  try {
    const customerFind = await findCustomer(customerId);
    if (!customerFind) {
      throw new Error("Customer not found");
    }
    await Customer.update(customer, { where: { id: customerId } });

    return customer;
  } catch (error) {
    throw new Error(
      error.name == "ER_DUP_ENTRY" ? "Duplicate entry for email" : error.message
    );
  }
};

module.exports = {
  createCustomer,
  getAllCustomer,
  findCustomer,
  deleteCustomer,
  updateCustomer,
};
