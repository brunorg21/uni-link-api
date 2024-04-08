import { Classes, Prisma } from "@prisma/client";
import { ClassesRepository } from "../repositories/classes-repository";
import { prisma } from "@/lib/prisma";

export class PrismaClassesRepository implements ClassesRepository {
  async create(data: Prisma.ClassesCreateInput): Promise<Classes> {
    const classes = await prisma.classes.create({
      data,
    });

    return classes;
  }
  async edit(
    classId: string,
    data: Prisma.ClassesUpdateInput
  ): Promise<Classes> {
    const classes = await prisma.classes.update({
      where: {
        id: classId,
      },
      data,
    });

    return classes;
  }
  async delete(classId: string): Promise<void> {
    await prisma.classes.delete({
      where: {
        id: classId,
      },
    });
  }
  async findById(classId: string): Promise<Classes | null> {
    const classes = await prisma.classes.findUnique({
      where: {
        id: classId,
      },
    });

    if (!classes) {
      return null;
    }

    return classes;
  }
}
