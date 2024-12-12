import { PrismaCourseRepository } from "@/domain/prisma/prisma-course-repository";

import { DeleteCourseUseCase } from "@/domain/use-cases/course/delete";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const courseSchemaParams = z.object({
  id: z.string(),
});

export async function deleteCourse(req: FastifyRequest, reply: FastifyReply) {
  const { id } = courseSchemaParams.parse(req.params);
  const courseRepository = new PrismaCourseRepository();

  const deleteCourseUseCase = new DeleteCourseUseCase(courseRepository);

  try {
    await deleteCourseUseCase.execute({
      courseId: id,
    });
    return reply.status(204).send();
  } catch (error) {
    console.log("error", error);

    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
