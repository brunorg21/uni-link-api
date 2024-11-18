import { PrismaClassesRepository } from "@/domain/prisma/prisma-classes-repository";
import { FindManyClasses } from "@/domain/use-cases/classes/find-many";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const getSchema = z.object({
  date: z.string().nullish(),
});

export async function getClasses(req: FastifyRequest, reply: FastifyReply) {
  const classesRepository = new PrismaClassesRepository();
  const findManyClassesUseCase = new FindManyClasses(classesRepository);

  const { date } = getSchema.parse(req.query);

  try {
    const { classes } = await findManyClassesUseCase.execute(date);
    return classes;
  } catch (error) {
    console.log("error", error);
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
