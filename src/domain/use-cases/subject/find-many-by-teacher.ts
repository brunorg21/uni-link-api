import { SubjectRepository } from "@/domain/repositories/subject-repository";
import { Subject } from "@prisma/client";

interface FindManySubjectByTeacherRequest {
  teacherId: string;
}

interface FindManySubjectByTeacherResponse {
  subjects: Subject[];
}

export class FindManyByTeacherSubject {
  constructor(private subjectRepository: SubjectRepository) {}

  async execute({
    teacherId,
  }: FindManySubjectByTeacherRequest): Promise<FindManySubjectByTeacherResponse> {
    const subjects = await this.subjectRepository.findManyByTeacher(teacherId);

    return {
      subjects,
    };
  }
}
