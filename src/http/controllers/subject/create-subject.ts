import { PrismaSubjectRepository } from "@/domain/prisma/prisma-subject-repository";
import { CreateSubjectUseCase } from "@/domain/use-cases/subject/create";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const createSubjectSchema = z.object({
  name: z.string(),
  userId: z.string().uuid(),
  courseId: z.string().uuid(),
  semester: z.number(),
});

export async function createSubject(req: FastifyRequest, reply: FastifyReply) {
  const { name, userId, courseId, semester } = createSubjectSchema.parse(
    req.body
  );

  const subjectRepository = new PrismaSubjectRepository();
  const createSubjectUseCase = new CreateSubjectUseCase(subjectRepository);

  try {
    await createSubjectUseCase.execute({
      data: {
        userId,
        name,
        courseId,
        semester,
      },
    });

    return reply.status(201).send();
  } catch (error) {
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
