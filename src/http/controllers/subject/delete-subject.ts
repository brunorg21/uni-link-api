import { PrismaSubjectRepository } from "@/domain/prisma/prisma-subject-repository";

import { DeleteSubjectUseCase } from "@/domain/use-cases/subject/delete";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const subjectSchemaParams = z.object({
  id: z.string(),
});

export async function deleteSubject(req: FastifyRequest, reply: FastifyReply) {
  const { id } = subjectSchemaParams.parse(req.params);
  const subjectRepository = new PrismaSubjectRepository();

  const deleteSubjectUseCase = new DeleteSubjectUseCase(subjectRepository);

  try {
    await deleteSubjectUseCase.execute({
      subjectId: id,
    });
    return reply.status(204).send();
  } catch (error) {
    console.log("error", error);

    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
