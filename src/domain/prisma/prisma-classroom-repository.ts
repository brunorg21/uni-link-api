import { Prisma, $Enums, Classroom } from "@prisma/client";
import { ClassroomRepository } from "../repositories/classroom-repository";
import { prisma } from "@/lib/prisma";

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

  async findMany(): Promise<Classroom[] | []> {
    const classrooms = await prisma.classroom.findMany({
      include: {
        alocations: true,
      },
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
