import { PrismaAlocationRepository } from "@/domain/prisma/prisma-alocation-repository";
import { FindManyAlocationUseCase } from "@/domain/use-cases/alocation/find-many";

import { FastifyReply, FastifyRequest } from "fastify";

export async function findManyAlocations(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const alocationRepository = new PrismaAlocationRepository();

  const findManyAlocationUseCase = new FindManyAlocationUseCase(
    alocationRepository
  );

  try {
    const { alocations } = await findManyAlocationUseCase.execute();

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
