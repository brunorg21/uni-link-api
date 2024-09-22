import { PrismaSubjectRepository } from "@/domain/prisma/prisma-subject-repository";
import { FindManySubject } from "@/domain/use-cases/subject/find-many";

import { FastifyReply, FastifyRequest } from "fastify";

export async function getSubject(req: FastifyRequest, reply: FastifyReply) {
  const subjectRepository = new PrismaSubjectRepository();
  const findManySubjectUseCase = new FindManySubject(subjectRepository);

  try {
    const { subjects } = await findManySubjectUseCase.execute();
    return subjects;
  } catch (error) {
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
