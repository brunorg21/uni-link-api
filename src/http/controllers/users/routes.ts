import { FastifyInstance } from "fastify";
import { getTeachers } from "./getTeachers";
import { createTeacher } from "./create-teacher";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { updateTeacher } from "./update-user";
import { deleteTeacher } from "./delete-teacher";
import { assignStudentWithSubjects } from "./assign-student-with-subjects";
import { getStudents } from "./get-students";
import { getManyTeachers } from "./get-many-teachers";

export async function userRoutes(app: FastifyInstance) {
  app.addHook("preHandler", verifyJwt);
  app.get("/teachers", getTeachers);
  app.post("/teachers", createTeacher);
  app.put("/teachers/:id", updateTeacher);
  app.delete("/teachers/:id", deleteTeacher);
  app.put("/users/assignStudentWithSubject/:id", assignStudentWithSubjects);
  app.get("/students", getStudents);
  app.get("/todayTeachers", getManyTeachers);
}
