import { PrismaUsersRepository } from "@/domain/prisma/prisma-users-repository";
import { FindManyTeacherByQueryUseCase } from "@/domain/use-cases/user/find-many-teacher-by-query";
import { FindManyTeachersUseCase } from "@/domain/use-cases/user/find-many-teachers";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const teacherSchema = z.object({
  date: z.string().nullable(),
});

export async function getManyTeachers(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { date } = teacherSchema.parse(req.query);
  const teacherRepository = new PrismaUsersRepository();
  const findManyTeacherUseCase = new FindManyTeachersUseCase(teacherRepository);

  try {
    const { users: teachers } = await findManyTeacherUseCase.execute({ date });
    return teachers;
  } catch (error) {
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
