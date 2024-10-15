import { FastifyInstance } from "fastify";
import { createAlocation } from "./create-alocation";

export async function alocationRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request, reply) => {
    await request.jwtVerify();
  });
  app.post("/alocations", createAlocation);
}
