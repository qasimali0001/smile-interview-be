const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "Sample Customer",
    description: "Documentation generated",
  },
  host: "smile-publi-4w6ngycewodk-1190691278.ap-south-1.elb.amazonaws.com",
  basePath: "/api",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Customer",
      description: "Endpoints",
    },
  ],
  definitions: {
    Customer: {
      firstName: "Jhon",
      lastName: "Doe",
      email: "test@testing.com",
      gender: "Male",
      addresses: [
        {
          street: "Example",
          city: "Example",
          country: "Example",
        },
      ],
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  await require("./src/app"); // Your project's root file
});
