import { FastifyInstance } from "fastify";
import { getClasses } from "./get";

export async function classesRoutes(app: FastifyInstance) {
  app.get("/classes", getClasses);
}
