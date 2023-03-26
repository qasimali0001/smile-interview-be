const express = require("express");
const { celebrate } = require("celebrate");

const customerController = require("../controllers/customer.controller");
const customerValidation = require("../validations/customer.validation");

const router = express.Router();

router
  .route("/")
  .get(customerController.getAllCustomer)

  .post(
    celebrate(customerValidation.createCustomer),
    customerController.createCustomer
  );

router
  .route("/:id")
  .get(customerController.getCustomer)
  .post(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

module.exports = router;
