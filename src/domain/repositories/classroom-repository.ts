import { Classroom, Prisma } from "@prisma/client";

export interface ClassroomRepository {
  create(data: Prisma.ClassroomUncheckedCreateInput): Promise<Classroom>;
  edit(
    classroomId: string,
    data: Prisma.ClassroomUncheckedUpdateInput
  ): Promise<Classroom>;
  delete(classroomId: string): Promise<void>;
  findById(id: string): Promise<Classroom | null>;
  findByTeacher(teacherId: string): Promise<Classroom[] | null>;
  findMany(date?: string | null): Promise<Classroom[] | []>;
  findManyMostUseful(
    userId: string,
    date?: string | null
  ): Promise<Classroom[] | []>;
}
