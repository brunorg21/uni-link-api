import { PrismaClassroomRepository } from "@/domain/prisma/prisma-classroom-repository";
import { FindManyClassroom } from "@/domain/use-cases/classroom/find-many";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const getSchema = z.object({
  date: z.string().nullish(),
});

export async function getClassroom(req: FastifyRequest, reply: FastifyReply) {
  const classroomRepository = new PrismaClassroomRepository();
  const findManyClassroomUseCase = new FindManyClassroom(classroomRepository);

  const { date } = getSchema.parse(req.query);

  try {
    const { classrooms } = await findManyClassroomUseCase.execute(date);
    return classrooms;
  } catch (error) {
    console.log("error", error);
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
