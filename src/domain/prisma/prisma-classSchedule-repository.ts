import { ClassSchedule, Prisma } from "@prisma/client";
import { ClassScheduleRepository } from "../repositories/classSchedule-repository";
import { prisma } from "@/lib/prisma";

export class PrismaClassScheduleRepository implements ClassScheduleRepository {
  async create(
    data: Prisma.ClassScheduleUncheckedCreateInput
  ): Promise<ClassSchedule> {
    const classSchedule = await prisma.classSchedule.create({
      data,
    });

    return classSchedule;
  }
  async edit(
    classScheduleId: string,
    data: Prisma.ClassScheduleUncheckedUpdateInput
  ): Promise<ClassSchedule> {
    const classSchedule = await prisma.classSchedule.update({
      where: {
        id: classScheduleId,
      },
      data,
    });

    return classSchedule;
  }
  async delete(classScheduleId: string): Promise<void> {
    await prisma.classSchedule.delete({
      where: {
        id: classScheduleId,
      },
    });
  }
  async findById(classScheduleId: string): Promise<ClassSchedule | null> {
    const classSchedule = await prisma.classSchedule.findUnique({
      where: {
        id: classScheduleId,
      },
    });

    if (!classSchedule) {
      return null;
    }

    return classSchedule;
  }
}
