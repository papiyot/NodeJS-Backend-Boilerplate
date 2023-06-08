const fp = require("fastify-plugin");
const fastifyEnv = require("@fastify/env");

const schema = {
  type: "object",
  required: [
    "NODE_ENV",
    "NODE_SECRET_KEY",
    "NODE_DB_NAME",
    "NODE_DB_HOST",
    "NODE_DB_PORT",
    "NODE_DB_USERNAME",
    "NODE_DB_PASSWORD",
  ],
  properties: {
    NODE_ENV: {
      type: "string",
      default: "dev",
    },
    NODE_SECRET_KEY: {
      type: "string",
      default: "dev",
    },
    NODE_DB_NAME: {
      type: "string",
      default: "backend",
    },
    NODE_DB_HOST: {
      type: "string",
      default: "localhost",
    },
    NODE_DB_PORT: {
      type: "number",
      default: 5432,
    },
    NODE_DB_USERNAME: {
      type: "string",
      default: "postgres",
    },
    NODE_DB_PASSWORD: {
      type: "string",
      default: "password",
    },
  },
};

const options = {
  schema: schema,
  dotenv: true, // will read .env in root folder
};

module.exports = fp(async (fastify, opts) => {
  fastify.register(fastifyEnv, options).ready((err) => {
    if (err) console.error(err);
    // console.log(fastify.config)
    //   console.log(fastify.config) // or fastify[options.confKey]
    // output: { PORT: 3000 }
  });
});
