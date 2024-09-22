import { FastifyInstance } from "fastify";
import { getSubject } from "./get-all";
import { createSubject } from "./create-subject";

export async function subjectRoutes(app: FastifyInstance) {
  app.get("/subjects", getSubject);
  app.post("/subjects", createSubject);
}
