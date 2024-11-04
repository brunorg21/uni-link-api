import { PrismaCourseRepository } from "@/domain/prisma/prisma-course-repository";
import { CreateCourseUseCase } from "@/domain/use-cases/course/create";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const createCourseSchema = z.object({
  name: z.string(),
});

export async function createCourse(req: FastifyRequest, reply: FastifyReply) {
  const { name } = createCourseSchema.parse(req.body);

  const courseRepository = new PrismaCourseRepository();
  const createCourseUseCase = new CreateCourseUseCase(courseRepository);

  try {
    await createCourseUseCase.execute({
      data: {
        name,
      },
    });

    return reply.status(201).send();
  } catch (error) {
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
