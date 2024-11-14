import Fastify from "fastify";
import userRouter from "./src/routes/user.js";

const fastify = Fastify({
  logger: true, // Enable logging for requests, errors, etc.
});

// Register user routes
fastify.register(userRouter);

// Declare a simple route for testing
fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

// Run the server
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err); // Log the error if any
    process.exit(1); // Exit the process with failure
  }
  fastify.log.info(`Server is now listening on ${address}`); // Log server start
});

// Optionally, handle 404 errors for routes not found
fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).send({ error: "Route not found" });
});
