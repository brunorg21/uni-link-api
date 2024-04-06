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
  async create(data: Prisma.ClassroomCreateInput): Promise<Classroom> {
    const classroom = await prisma.classroom.create({
      data,
    });

    return classroom;
  }

  async edit(
    classroomId: string,
    data: Prisma.ClassroomUpdateInput
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
