// Define the schema for creating a user
const createUserSchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
    },
    required: ["name", "email", "password"], // Ensure these fields are provided
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        email: { type: "string" },
      },
    },
  },
};

// Define the user router function
async function userRouter(fastify, opts) {
  fastify.post(
    "/users",
    { schema: createUserSchema },
    async function (request, reply) {
      // Log the request body for debugging purposes
      console.log(request.body);

      // Generate a dynamic user ID (using Date.now() here, but could be replaced with UUID in real apps)
      const userId = Date.now();

      // Respond with the created user
      return reply
        .code(201) // Status code 201 for resource creation
        .send({
          id: userId,
          name: request.body.name,
          email: request.body.email,
        });
    }
  );
}

// Export the router (if using ES modules)
export default userRouter;
