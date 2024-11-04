import { PrismaUsersRepository } from "@/domain/prisma/prisma-users-repository";

import { DeleteUserUseCase } from "@/domain/use-cases/user/delete-user";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const courseSchemaParams = z.object({
  id: z.string(),
});

export async function deleteCourse(req: FastifyRequest, reply: FastifyReply) {
  const { id } = courseSchemaParams.parse(req.params);
  const courseRepository = new PrismaUsersRepository();

  const deleteCourseUseCase = new DeleteUserUseCase(courseRepository);

  try {
    await deleteCourseUseCase.execute({
      id,
    });
    return reply.status(204).send();
  } catch (error) {
    console.log("error", error);

    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
