import { PrismaSubjectRepository } from "@/domain/prisma/prisma-subject-repository";
import { PrismaUsersRepository } from "@/domain/prisma/prisma-users-repository";
import { AssignStudentWithSubjectsUseCase } from "@/domain/use-cases/user/assign-student-with-subjects";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const assignStudentWithSubjectsSchema = z.object({
  semester: z.number(),
});
const assignStudentWithSubjectsSchemaParams = z.object({
  id: z.string(),
});

export async function assignStudentWithSubjects(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { semester } = assignStudentWithSubjectsSchema.parse(req.body);
  const { id } = assignStudentWithSubjectsSchemaParams.parse(req.params);
  const usersRepository = new PrismaUsersRepository();
  const subjectsRepository = new PrismaSubjectRepository();
  const assignStudentWithSubjectsUseCase = new AssignStudentWithSubjectsUseCase(
    usersRepository,
    subjectsRepository
  );

  try {
    await assignStudentWithSubjectsUseCase.execute({
      id,
      semester,
    });
    return reply.status(201).send();
  } catch (error) {
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
