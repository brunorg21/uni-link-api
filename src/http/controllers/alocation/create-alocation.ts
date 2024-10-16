import { PrismaAlocationRepository } from "@/domain/prisma/prisma-alocation-repository";
import { PrismaClassesRepository } from "@/domain/prisma/prisma-classes-repository";
import { CreateAlocationUseCase } from "@/domain/use-cases/alocation/create";
import { CreateClassUseCase } from "@/domain/use-cases/classes/create";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const createAlocationSchema = z.object({
  classroomId: z.string(),
  subjectId: z.string(),
  classScheduleIds: z.array(z.string()),
  date: z.string(),
});

export async function createAlocation(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { classroomId, subjectId, classScheduleIds, date } =
    createAlocationSchema.parse(req.body);

  const alocationRepository = new PrismaAlocationRepository();
  const classesRepository = new PrismaClassesRepository();
  const createAlocationUseCase = new CreateAlocationUseCase(
    alocationRepository,
    classesRepository
  );
  const createClassesUseCase = new CreateClassUseCase(classesRepository);

  try {
    const classes = classScheduleIds.map(async (classScheduleId) => {
      return await createClassesUseCase.execute({
        data: {
          classroomId,
          subjectId,
          classDate: date,
          classScheduleId,
        },
      });
    });

    Promise.all(classes).then((data) => {
      data.map((classes) =>
        createAlocationUseCase.execute({
          alocation: {
            classroomId,
            userId: req.user.sub,
            classesId: classes.class.id,
            date,
          },
        })
      );
    });

    return reply.status(201).send();
  } catch (error) {
    console.log("error", error);
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
