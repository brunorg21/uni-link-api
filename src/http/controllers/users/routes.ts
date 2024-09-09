import { FastifyInstance } from "fastify";
import { getTeachers } from "./getTeachers";

export async function userRoutes(app: FastifyInstance) {
  app.get("/teachers", getTeachers);
}
