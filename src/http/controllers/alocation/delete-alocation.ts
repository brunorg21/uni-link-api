import { PrismaAlocationRepository } from "@/domain/prisma/prisma-alocation-repository";
import { DeleteAlocationUseCase } from "@/domain/use-cases/alocation/delete";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const alocationSchemaParams = z.object({
  id: z.string(),
});

export async function deleteAlocation(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = alocationSchemaParams.parse(req.params);
  const alocationRepository = new PrismaAlocationRepository();

  const deleteAlocationUseCase = new DeleteAlocationUseCase(
    alocationRepository
  );

  try {
    await deleteAlocationUseCase.execute({
      alocationId: id,
    });
    return reply.status(204).send();
  } catch (error) {
    console.log("error", error);

    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
