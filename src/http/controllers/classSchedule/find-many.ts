import { PrismaClassScheduleRepository } from "@/domain/prisma/prisma-classSchedule-repository";
import { PrismaSubjectRepository } from "@/domain/prisma/prisma-subject-repository";
import { FindManyClassSchedule } from "@/domain/use-cases/classSchedule/find-many";

import { FindManyByTeacherSubject } from "@/domain/use-cases/subject/find-many-by-teacher";

import { FastifyReply, FastifyRequest } from "fastify";

export async function findManyClassSchedule(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const classScheduleRepository = new PrismaClassScheduleRepository();
  const findManyClassScheduleUseCase = new FindManyClassSchedule(
    classScheduleRepository
  );

  try {
    const { classschedules } = await findManyClassScheduleUseCase.execute();
    return classschedules;
  } catch (error) {
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
