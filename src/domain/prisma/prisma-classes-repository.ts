import { Classes, Prisma, Subject } from "@prisma/client";
import { ClassesRepository } from "../repositories/classes-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaClassesRepository implements ClassesRepository {
  async findManyByStudent(subjects: Subject[]): Promise<Classes[]> {
    const classes = await Promise.all(
      subjects.map(async (subject) => {
        return await prisma.classes.findMany({
          where: {
            subjectId: subject.id,
            classDate: {
              gte: dayjs(new Date()).startOf("day").toDate(),
              lt: dayjs(new Date()).endOf("day").toDate(),
            },
          },
        });
      })
    );

    const allClasses = classes.flat();

    return allClasses;
  }

  async findMany(date?: string | null): Promise<Classes[]> {
    const formattedDate = date
      ? dayjs(date).utc().startOf("day").toISOString()
      : undefined;
    const classes = await prisma.classes.findMany({
      where: {
        classDate: formattedDate,
      },
      include: {
        subject: true,
        classSchedule: true,
        classroom: true,
      },
    });

    return classes;
  }
  async create(data: Prisma.ClassesUncheckedCreateInput): Promise<Classes> {
    const classes = await prisma.classes.create({
      data,
    });

    return classes;
  }
  async edit(
    classId: string,
    data: Prisma.ClassesUncheckedUpdateInput
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
    const a = await prisma.classroom.findMany({
      include: {
        _count: {
          select: {
            alocations: true,
          },
        },
      },
      orderBy: {
        alocations: {
          _count: "desc",
        },
      },
    });

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
