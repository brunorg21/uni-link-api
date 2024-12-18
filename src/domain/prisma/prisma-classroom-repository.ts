import { Prisma, $Enums, Classroom } from "@prisma/client";
import { ClassroomRepository } from "../repositories/classroom-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export class PrismaClassroomRepository implements ClassroomRepository {
  async findById(id: string): Promise<Classroom | null> {
    const classroom = await prisma.classroom.findUnique({
      where: {
        id,
      },
    });

    if (!classroom) {
      return null;
    }

    return classroom;
  }

  async findMany(date?: string | null): Promise<Classroom[] | []> {
    const formattedDate = date
      ? dayjs(date).utc().startOf("day").toISOString()
      : undefined;

    const classrooms = await prisma.classroom.findMany({
      include: {
        alocations: {
          where: {
            ...(date && {
              date: formattedDate,
            }),
          },
          include: {
            class: true,
            classroom: true,
            user: true,
          },
        },
        classes: {
          where: {
            ...(date && {
              classDate: formattedDate,
            }),
          },
          select: {
            subject: {
              include: {
                user: true,
              },
            },
            classScheduleId: true,
            id: true,
            classDate: true,
          },
        },
      },
    });

    return classrooms;
  }

  async findManyAlocated(date?: string | null): Promise<Classroom[] | []> {
    const formattedDate = date
      ? dayjs(date).startOf("day").subtract(3, "hour").toISOString()
      : undefined;

    const classrooms = await prisma.classroom.findMany({
      where: {
        alocations: {
          some: {
            ...(formattedDate && { date: formattedDate }),
          },
        },
      },
      include: {
        alocations: {
          where: {
            ...(formattedDate && { date: formattedDate }),
          },
          include: {
            class: true,
            classroom: true,
            user: true,
          },
        },
        classes: {
          where: {
            ...(formattedDate && { classDate: formattedDate }),
          },
          select: {
            subject: {
              include: {
                user: true,
              },
            },
            classScheduleId: true,
            id: true,
            classDate: true,
          },
        },
      },
    });

    return classrooms;
  }

  async findManyMostUseful(
    userId: string,
    date?: string | null
  ): Promise<Classroom[] | []> {
    const formattedDate = date
      ? dayjs(date).startOf("day").toISOString()
      : undefined;

    // Primeiro, obtemos as salas com as contagens desejadas em uma subquery
    const classrooms = await prisma.classroom.findMany({
      where: {
        alocations: {
          some: {
            userId,
          },
        },
      },
      include: {
        _count: {
          select: {
            alocations: {
              where: {
                userId,
              },
            },
          },
        },
        classes: {
          where: {
            ...(date && {
              classDate: formattedDate,
            }),
          },
          select: {
            subject: {
              include: {
                user: true,
              },
            },
            classScheduleId: true,
            id: true,
            classDate: true,
          },
        },
      },
      orderBy: {
        alocations: {
          _count: "desc", // Define ordenação pela contagem de alocações
        },
      },
      take: 5,
    });

    return classrooms;
  }

  async findByTeacher(teacherId: string): Promise<Classroom[] | null> {
    const classrooms = await prisma.classroom.findMany({
      where: {
        alocations: {
          every: {
            userId: teacherId,
          },
        },
      },
      take: 2,
    });

    if (!classrooms) {
      return null;
    }

    return classrooms;
  }
  async create(data: Prisma.ClassroomUncheckedCreateInput): Promise<Classroom> {
    const classroom = await prisma.classroom.create({
      data,
    });

    return classroom;
  }

  async edit(
    classroomId: string,
    data: Prisma.ClassroomUncheckedUpdateInput
  ): Promise<Classroom> {
    const classroom = await prisma.classroom.update({
      where: {
        id: classroomId,
      },
      data,
    });

    return classroom;
  }

  async delete(classroomId: string): Promise<void> {
    await prisma.classroom.delete({
      where: {
        id: classroomId,
      },
    });
  }
}
