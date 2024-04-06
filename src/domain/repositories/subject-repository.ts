import { Prisma, Subject } from "@prisma/client";

export interface SubjectRepository {
  create(data: Prisma.SubjectCreateInput): Promise<Subject>;
  edit(subjectId: string, data: Prisma.SubjectUpdateInput): Promise<Subject>;
  delete(subjectId: string): Promise<void>;
  findById(subjectId: string): Promise<Subject | null>;
}
