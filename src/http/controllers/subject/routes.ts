import { FastifyInstance } from "fastify";
import { getSubject } from "./get-all";
import { createSubject } from "./create-subject";
import { getSubjectsByTeacher } from "./get-all-by-teacher";
import { updateSubject } from "./update-subject";
import { deleteSubject } from "./delete-subject";

export async function subjectRoutes(app: FastifyInstance) {
  app.get("/subjects", getSubject);
  app.get("/subjects/teachers/:teacherId", getSubjectsByTeacher);
  app.post("/subjects", createSubject);
  app.put("/subjects/:id", updateSubject);
  app.delete("/subjects/:id", deleteSubject);
}
