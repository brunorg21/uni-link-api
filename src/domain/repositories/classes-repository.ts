import { Classes, Prisma, Subject } from "@prisma/client";

export interface ClassesRepository {
  create(data: Prisma.ClassesUncheckedCreateInput): Promise<Classes>;
  edit(
    classId: string,
    data: Prisma.ClassesUncheckedUpdateInput
  ): Promise<Classes>;
  delete(classId: string): Promise<void>;
  findById(classId: string): Promise<Classes | null>;
  findManyByStudent(subjects: Subject[]): Promise<Classes[] | null>;
}
