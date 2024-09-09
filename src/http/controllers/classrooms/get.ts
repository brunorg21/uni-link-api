import { PrismaClassroomRepository } from "@/domain/prisma/prisma-classroom-repository";
import { FindManyClassroom } from "@/domain/use-cases/classroom/find-many";
import { UserWithSameEmailError } from "@/errors/user-with-same-email-error";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getClassroom(req: FastifyRequest, reply: FastifyReply) {
  const classroomRepository = new PrismaClassroomRepository();
  const findManyClassroomUseCase = new FindManyClassroom(classroomRepository);

  try {
    const { classrooms } = await findManyClassroomUseCase.execute();
    return classrooms;
  } catch (error) {
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
