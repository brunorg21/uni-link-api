import { FastifyInstance } from "fastify";
import { getClassroom } from "./get";

export async function classroomRoutes(app: FastifyInstance) {
  app.get("/classrooms", getClassroom);
}
