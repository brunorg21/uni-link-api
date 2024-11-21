import { FastifyInstance } from "fastify";
import { getClassroom } from "./get";
import { createClassroom } from "./create-classroom";
import { getMostUseful } from "./get-most-useful";
import { getAlocated } from "./get-alocated";

export async function classroomRoutes(app: FastifyInstance) {
  app.get("/classrooms", getClassroom);
  app.get("/mostUseful", getMostUseful);
  app.post("/classrooms", createClassroom);
  app.get("/alocated", getAlocated);
}
