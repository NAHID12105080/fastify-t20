const createUserSchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
    },
    required: ["name", "email", "password"],
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

async function userRouter(fastify, opts) {
  fastify.post(
    "/users",
    { schema: createUserSchema },
    async function (request, reply) {
      const { name, email, password } = request.body;
      const result = await fastify.db.User.create({ name, email, password });
      reply.code(201).send(result);
    }
  );
}
