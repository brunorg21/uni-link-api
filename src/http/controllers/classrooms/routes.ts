import { FastifyInstance } from "fastify";
import { getClassroom } from "./get";
import { createClassroom } from "./create-classroom";
import { getMostUseful } from "./get-most-useful";

export async function classroomRoutes(app: FastifyInstance) {
  app.get("/classrooms", getClassroom);
  app.get("/mostUseful", getMostUseful);
  app.post("/classrooms", createClassroom);
}
