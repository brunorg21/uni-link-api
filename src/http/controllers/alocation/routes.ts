import { FastifyInstance } from "fastify";
import { createAlocation } from "./create-alocation";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function alocationRoutes(app: FastifyInstance) {
  app.addHook("preHandler", verifyJwt);
  app.post("/alocations", createAlocation);
}
