import { PrismaSubjectRepository } from "@/domain/prisma/prisma-subject-repository";
import { CreateSubjectUseCase } from "@/domain/use-cases/subject/create";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const createSubjectSchema = z.object({
  name: z.string(),
  userId: z.string().uuid(),
});

export async function createSubject(req: FastifyRequest, reply: FastifyReply) {
  const { name, userId } = createSubjectSchema.parse(req.body);

  const subjectRepository = new PrismaSubjectRepository();
  const createSubjectUseCase = new CreateSubjectUseCase(subjectRepository);

  try {
    await createSubjectUseCase.execute({
      data: {
        userId,
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
