import { Classes, Prisma } from "@prisma/client";

export interface ClassesRepository {
  create(data: Prisma.ClassesCreateInput): Promise<Classes>;
  edit(classId: string, data: Prisma.ClassesUpdateInput): Promise<Classes>;
  delete(classId: string): Promise<void>;
  findById(classId: string): Promise<Classes | null>;
}
