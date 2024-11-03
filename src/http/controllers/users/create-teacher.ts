import { PrismaUsersRepository } from "@/domain/prisma/prisma-users-repository";
import { CreateUserUseCase } from "@/domain/use-cases/user/create-user";
import { FindManyTeacherByQueryUseCase } from "@/domain/use-cases/user/find-many-teacher-by-query";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const teacherSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["TEACHER", "ADMIN", "STUDENT"]),
  name: z.string(),
});

export async function createTeacher(req: FastifyRequest, reply: FastifyReply) {
  const { email, name, password, role } = teacherSchema.parse(req.body);
  const teacherRepository = new PrismaUsersRepository();
  const createTeacherUseCase = new CreateUserUseCase(teacherRepository);

  try {
    const { user: teacher } = await createTeacherUseCase.execute({
      user: {
        email,
        name,
        password,
        role,
      },
    });
    return reply.status(201).send({
      teacher: {
        ...teacher,
        password_hash: undefined,
      },
    });
  } catch (error) {
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
