import { PrismaSubjectRepository } from "@/domain/prisma/prisma-subject-repository";
import { EditSubjectUseCase } from "@/domain/use-cases/subject/edit";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const subjectSchema = z.object({
  name: z.string(),
  teacherId: z.string(),
});

const subjectSchemaParams = z.object({
  id: z.string(),
});

export async function updateSubject(req: FastifyRequest, reply: FastifyReply) {
  const { name, teacherId } = subjectSchema.parse(req.body);
  const { id } = subjectSchemaParams.parse(req.params);
  const subjectRepository = new PrismaSubjectRepository();
  const updateSubjectUseCase = new EditSubjectUseCase(subjectRepository);

  try {
    const { subject } = await updateSubjectUseCase.execute({
      data: {
        name,
        userId: teacherId,
      },
      subjectId: id,
    });
    return reply.status(204).send({
      subject: {
        ...subject,
      },
    });
  } catch (error) {
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
