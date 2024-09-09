import { PrismaUsersRepository } from "@/domain/prisma/prisma-users-repository";
import { FindManyTeacherByQueryUseCase } from "@/domain/use-cases/user/find-many-teacher-by-query";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const teacherSchema = z.object({
  q: z.string().nullable().default(""),
});

export async function getTeachers(req: FastifyRequest, reply: FastifyReply) {
  const { q } = teacherSchema.parse(req.query);
  const teacherRepository = new PrismaUsersRepository();
  const findManyTeacherUseCase = new FindManyTeacherByQueryUseCase(
    teacherRepository
  );

  try {
    const { users: teachers } = await findManyTeacherUseCase.execute({ q });
    return teachers;
  } catch (error) {
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
