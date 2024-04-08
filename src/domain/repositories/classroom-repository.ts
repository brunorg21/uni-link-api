import { Classroom, Prisma } from "@prisma/client";

export interface ClassroomRepository {
  create(data: Prisma.ClassroomCreateInput): Promise<Classroom>;
  edit(
    classroomId: string,
    data: Prisma.ClassroomUpdateInput
  ): Promise<Classroom>;
  delete(classroomId: string): Promise<void>;
  findById(id: string): Promise<Classroom | null>;
  findByTeacher(teacherId: string): Promise<Classroom[] | null>;
}
