import { Classroom, Prisma } from "@prisma/client";

export interface ClassroomRepository {
  create(data: Prisma.ClassroomCreateInput): Promise<Classroom>;
  edit(
    classroomId: string,
    data: Prisma.ClassroomUpdateInput
  ): Promise<Classroom>;
  findById(id: string): Promise<Classroom | null>;
}
