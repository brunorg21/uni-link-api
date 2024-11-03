import { PrismaSubjectRepository } from "@/domain/prisma/prisma-subject-repository";
import { PrismaUsersRepository } from "@/domain/prisma/prisma-users-repository";
import { CreateUserUseCase } from "@/domain/use-cases/user/create-user";
import { DeleteUserUseCase } from "@/domain/use-cases/user/delete-user";
import { FindManyTeacherByQueryUseCase } from "@/domain/use-cases/user/find-many-teacher-by-query";
import { UpdateUserUseCase } from "@/domain/use-cases/user/update-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const teacherSchemaParams = z.object({
  id: z.string(),
});

export async function deleteTeacher(req: FastifyRequest, reply: FastifyReply) {
  const { id } = teacherSchemaParams.parse(req.params);
  const teacherRepository = new PrismaUsersRepository();

  const deleteTeacherUseCase = new DeleteUserUseCase(teacherRepository);

  try {
    await deleteTeacherUseCase.execute({
      id,
    });
    return reply.status(204).send();
  } catch (error) {
    console.log("error", error);

    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
