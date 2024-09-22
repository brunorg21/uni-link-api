import { Prisma, Subject } from "@prisma/client";

export interface SubjectRepository {
  create(data: Prisma.SubjectUncheckedCreateInput): Promise<Subject>;
  edit(
    subjectId: string,
    data: Prisma.SubjectUncheckedUpdateInput
  ): Promise<Subject>;
  delete(subjectId: string): Promise<void>;
  findById(subjectId: string): Promise<Subject | null>;
  findByStudent(studentId: string): Promise<Subject[]>;
  findMany(): Promise<Subject[]>;
}
