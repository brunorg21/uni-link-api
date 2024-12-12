import { PrismaAlocationRepository } from "@/domain/prisma/prisma-alocation-repository";
import { FindManyByTeacherAlocationUseCase } from "@/domain/use-cases/alocation/find-many-alocations-by-teacher";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const findManyByTeacherSchema = z.object({
  teacherId: z.string(),
});

export async function findManyAlocationByTeacher(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { teacherId } = findManyByTeacherSchema.parse(req.params);

  const alocationRepository = new PrismaAlocationRepository();

  const findManyAlocationByTeacherUseCase =
    new FindManyByTeacherAlocationUseCase(alocationRepository);

  try {
    const { alocations } = await findManyAlocationByTeacherUseCase.execute({
      teacherId,
    });

    return reply.status(200).send({
      alocations,
    });
  } catch (error) {
    console.log("error", error);
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
