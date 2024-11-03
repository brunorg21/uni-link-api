import { PrismaUsersRepository } from "@/domain/prisma/prisma-users-repository";
import { CreateUserUseCase } from "@/domain/use-cases/user/create-user";
import { FindManyTeacherByQueryUseCase } from "@/domain/use-cases/user/find-many-teacher-by-query";
import { UpdateUserUseCase } from "@/domain/use-cases/user/update-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const teacherSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["TEACHER"]),
  name: z.string(),
});

const teacherSchemaParams = z.object({
  id: z.string(),
});

export async function updateTeacher(req: FastifyRequest, reply: FastifyReply) {
  const { email, name, password, role } = teacherSchema.parse(req.body);
  const { id } = teacherSchemaParams.parse(req.params);
  const teacherRepository = new PrismaUsersRepository();
  const updateTeacherUseCase = new UpdateUserUseCase(teacherRepository);

  try {
    const { user: teacher } = await updateTeacherUseCase.execute({
      user: {
        id,
        name,
        email,
        password,
        role,
      },
    });
    return reply.status(204).send({
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
