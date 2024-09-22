import { PrismaAlocationRepository } from "@/domain/prisma/prisma-alocation-repository";
import { PrismaClassesRepository } from "@/domain/prisma/prisma-classes-repository";
import { CreateAlocationUseCase } from "@/domain/use-cases/alocation/create";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const createAlocationSchema = z.object({
  classesId: z.string().uuid(),
  classroomId: z.string().uuid(),
});

export async function createClassalocation(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { classesId, classroomId } = createAlocationSchema.parse(req.body);

  const alocationRepository = new PrismaAlocationRepository();
  const classesRepository = new PrismaClassesRepository();
  const createAlocationUseCase = new CreateAlocationUseCase(
    alocationRepository,
    classesRepository
  );

  try {
    await createAlocationUseCase.execute({
      alocation: {
        classroomId,
        classesId,
        userId: req.user.sub,
      },
    });

    return reply.status(201).send();
  } catch (error) {
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
