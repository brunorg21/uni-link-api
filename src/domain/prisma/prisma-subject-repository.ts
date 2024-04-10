import { Prisma, Subject } from "@prisma/client";
import { SubjectRepository } from "../repositories/subject-repository";
import { prisma } from "@/lib/prisma";

export class PrismaSubjectRepository implements SubjectRepository {
  async create(data: Prisma.SubjectUncheckedCreateInput): Promise<Subject> {
    const subject = await prisma.subject.create({
      data,
    });

    return subject;
  }
  async findById(subjectId: string): Promise<Subject | null> {
    const subject = await prisma.subject.findUnique({
      where: {
        id: subjectId,
      },
    });

    if (!subject) {
      return null;
    }

    return subject;
  }

  async edit(
    subjectId: string,
    data: Prisma.SubjectUncheckedUpdateInput
  ): Promise<Subject> {
    const subject = await prisma.subject.update({
      where: {
        id: subjectId,
      },
      data,
    });

    return subject;
  }
  async delete(subjectId: string): Promise<void> {
    await prisma.subject.delete({
      where: {
        id: subjectId,
      },
    });
  }

  async findByStudent(studentId: string): Promise<Subject[] | null> {
    const subjects = await prisma.subject.findMany({
      where: {
        userId: studentId,
      },
    });

    if (!subjects) {
      return null;
    }

    return subjects;
  }
}
