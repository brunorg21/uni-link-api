import { FastifyInstance } from "fastify";
import { findManyClassSchedule } from "./find-many";

export async function classSchedulesRoutes(app: FastifyInstance) {
  app.get("/classSchedules", findManyClassSchedule);
}
