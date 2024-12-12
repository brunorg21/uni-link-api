import { Alocation, Prisma } from "@prisma/client";
import { AlocationRepository } from "../repositories/alocation-repository";
import { prisma } from "@/lib/prisma";

export class PrismaAlocationRepository implements AlocationRepository {
  async findMany(): Promise<Alocation[]> {
    const alocations = await prisma.alocation.findMany({
      include: {
        classroom: true,
        class: {
          include: {
            classSchedule: true,
            subject: true,
          },
        },
      },
    });

    return alocations;
  }
  async create(data: Prisma.AlocationUncheckedCreateInput): Promise<Alocation> {
    const alocation = await prisma.alocation.create({
      data,
    });

    return alocation;
  }

  async findManyByTeacher(teacherId: string): Promise<Alocation[]> {
    const alocations = await prisma.alocation.findMany({
      where: {
        userId: teacherId,
      },
      include: {
        classroom: true,
        class: {
          include: {
            classSchedule: true,
            subject: true,
          },
        },
      },
    });

    return alocations;
  }

  async edit(
    alocationId: string,
    data: Prisma.AlocationUncheckedUpdateInput
  ): Promise<Alocation> {
    const alocation = await prisma.alocation.update({
      where: {
        id: alocationId,
      },
      data,
    });

    return alocation;
  }
  async delete(alocationId: string): Promise<void> {
    await prisma.alocation.delete({
      where: {
        id: alocationId,
      },
    });
  }
  async findById(alocationId: string): Promise<Alocation | null> {
    const alocation = await prisma.alocation.findUnique({
      where: {
        id: alocationId,
      },
    });

    if (!alocation) {
      return null;
    }

    return alocation;
  }
}
