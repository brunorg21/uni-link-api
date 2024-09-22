import { PrismaClassroomRepository } from "@/domain/prisma/prisma-classroom-repository";
import { PrismaUsersRepository } from "@/domain/prisma/prisma-users-repository";
import { CreateClassroomUseCase } from "@/domain/use-cases/classroom/create";
import { CreateUserUseCase } from "@/domain/use-cases/user/create-user";
import { UserWithSameEmailError } from "@/errors/user-with-same-email-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const createRoomSchema = z.object({
  type: z.enum(["LAB", "CLASSROOM"]),
  name: z.string(),
  capacity: z.number().min(0).max(100).default(0),
  computers: z.number().min(0).max(100).default(0),
});

export async function createClassroom(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { type, name, capacity, computers } = createRoomSchema.parse(req.body);

  const classroomRepository = new PrismaClassroomRepository();
  const createClassroomUseCases = new CreateClassroomUseCase(
    classroomRepository
  );

  try {
    await createClassroomUseCases.execute({
      classroom: {
        type,
        name,
        capacity,
        computers,
      },
    });

    return reply.status(201).send();
  } catch (error) {
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
