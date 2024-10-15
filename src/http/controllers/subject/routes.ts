import { FastifyInstance } from "fastify";
import { getSubject } from "./get-all";
import { createSubject } from "./create-subject";
import { getSubjectsByTeacher } from "./get-all-by-teacher";

export async function subjectRoutes(app: FastifyInstance) {
  app.get("/subjects", getSubject);
  app.get("/subjects/teachers/:teacherId", getSubjectsByTeacher);
  app.post("/subjects", createSubject);
}
