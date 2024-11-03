import { FastifyInstance } from "fastify";
import { getTeachers } from "./getTeachers";
import { createTeacher } from "./create-teacher";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { updateTeacher } from "./update-user";
import { deleteTeacher } from "./delete-teacher";

export async function userRoutes(app: FastifyInstance) {
  app.addHook("preHandler", verifyJwt);
  app.get("/teachers", getTeachers);
  app.post("/teachers", createTeacher);
  app.put("/teachers/:id", updateTeacher);
  app.delete("/teachers/:id", deleteTeacher);
}
