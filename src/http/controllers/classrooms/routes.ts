import { FastifyInstance } from "fastify";
import { getClassroom } from "./get";
import { createClassroom } from "./create-classroom";

export async function classroomRoutes(app: FastifyInstance) {
  app.get("/classrooms", getClassroom);
  app.post("/classrooms", createClassroom);
}
