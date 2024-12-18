import { PrismaClassroomRepository } from "@/domain/prisma/prisma-classroom-repository";
import { FindManyClassroom } from "@/domain/use-cases/classroom/find-many";
import { FindManyMostUsefulUseCase } from "@/domain/use-cases/classroom/find-many-most-useful";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const getSchema = z.object({
  userId: z.string(),
  date: z.string().nullish(),
});

export async function getMostUseful(req: FastifyRequest, reply: FastifyReply) {
  const classroomRepository = new PrismaClassroomRepository();
  const findManyClassroomUseCase = new FindManyMostUsefulUseCase(
    classroomRepository
  );

  const { date, userId } = getSchema.parse(req.query);

  try {
    const { classrooms } = await findManyClassroomUseCase.execute({
      userId,
      date,
    });
    return classrooms;
  } catch (error) {
    console.log("error", error);
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
