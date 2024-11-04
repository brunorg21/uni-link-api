import { FastifyInstance } from "fastify";
import { getCourses } from "./get-all";
import { createCourse } from "./create-course";

import { updateCourse } from "./update-course";
import { deleteCourse } from "./delete-course";

export async function courseRoutes(app: FastifyInstance) {
  app.get("/courses", getCourses);
  app.post("/courses", createCourse);
  app.put("/courses/:id", updateCourse);
  app.delete("/courses/:id", deleteCourse);
}
