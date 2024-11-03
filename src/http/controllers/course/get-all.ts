import { PrismaCourseRepository } from "@/domain/prisma/prisma-course-repository";
import { FindManyCourse } from "@/domain/use-cases/course/find-many";

import { FastifyReply, FastifyRequest } from "fastify";

export async function getCourses(req: FastifyRequest, reply: FastifyReply) {
  const courseRepository = new PrismaCourseRepository();
  const findManyCourseUseCase = new FindManyCourse(courseRepository);

  try {
    const { courses } = await findManyCourseUseCase.execute();
    return courses;
  } catch (error) {
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
