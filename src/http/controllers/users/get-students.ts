import { PrismaUsersRepository } from "@/domain/prisma/prisma-users-repository";
import { FindManyByStudentUseCase } from "@/domain/use-cases/classes/find-many-by-student";
import { FindManyStudentsUseCase } from "@/domain/use-cases/user/find-many-students";
import { FindManyTeacherByQueryUseCase } from "@/domain/use-cases/user/find-many-teacher-by-query";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getStudents(req: FastifyRequest, reply: FastifyReply) {
  const teacherRepository = new PrismaUsersRepository();
  const findManyTeacherUseCase = new FindManyStudentsUseCase(teacherRepository);

  try {
    const { users: students } = await findManyTeacherUseCase.execute();
    return students;
  } catch (error) {
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
