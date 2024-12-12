import { FastifyInstance } from "fastify";
import { createAlocation } from "./create-alocation";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { findManyAlocationByTeacher } from "./find-many-alocations-by-teacher";
import { deleteAlocation } from "./delete-alocation";
import { findManyAlocations } from "./find-many-alocations";

export async function alocationRoutes(app: FastifyInstance) {
  app.addHook("preHandler", verifyJwt);
  app.post("/alocations", createAlocation);
  app.get("/alocations/teacher/:teacherId", findManyAlocationByTeacher);
  app.get("/alocations", findManyAlocations);
  app.delete("/alocations/:id", deleteAlocation);
}
