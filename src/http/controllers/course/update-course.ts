import { PrismaCourseRepository } from "@/domain/prisma/prisma-course-repository";
import { EditCourseUseCase } from "@/domain/use-cases/course/edit";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const courseSchema = z.object({
  name: z.string(),
});

const courseSchemaParams = z.object({
  id: z.string(),
});

export async function updateCourse(req: FastifyRequest, reply: FastifyReply) {
  const { name } = courseSchema.parse(req.body);
  const { id } = courseSchemaParams.parse(req.params);
  const courseRepository = new PrismaCourseRepository();
  const updateCourseUseCase = new EditCourseUseCase(courseRepository);

  try {
    const { course } = await updateCourseUseCase.execute({
      data: {
        name,
      },
      courseId: id,
    });
    return reply.status(204).send({
      course: {
        ...course,
      },
    });
  } catch (error) {
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
