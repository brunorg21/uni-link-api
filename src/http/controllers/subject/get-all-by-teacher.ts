import { PrismaSubjectRepository } from "@/domain/prisma/prisma-subject-repository";
import { FindManySubject } from "@/domain/use-cases/subject/find-many";
import { FindManyByTeacherSubject } from "@/domain/use-cases/subject/find-many-by-teacher";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const getAllSubjectsByTeacherSchema = z.object({
  teacherId: z.string(),
});

export async function getSubjectsByTeacher(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { teacherId } = getAllSubjectsByTeacherSchema.parse(req.params);

  const subjectRepository = new PrismaSubjectRepository();
  const findManySubjectUseCase = new FindManyByTeacherSubject(
    subjectRepository
  );

  try {
    const { subjects } = await findManySubjectUseCase.execute({
      teacherId,
    });
    return subjects;
  } catch (error) {
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
