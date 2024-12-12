import { Alocation, Prisma } from "@prisma/client";

export interface AlocationRepository {
  create(data: Prisma.AlocationUncheckedCreateInput): Promise<Alocation>;
  edit(
    alocationId: string,
    data: Prisma.AlocationUncheckedUpdateInput
  ): Promise<Alocation>;
  delete(alocationId: string): Promise<void>;
  findById(alocationId: string): Promise<Alocation | null>;
  findManyByTeacher(teacherId: string): Promise<Alocation[]>;
  findMany(): Promise<Alocation[]>;
}
