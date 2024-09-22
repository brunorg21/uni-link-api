import { SubjectRepository } from "@/domain/repositories/subject-repository";
import { Subject } from "@prisma/client";

interface FindManySubjectResponse {
  subjects: Subject[];
}

export class FindManySubject {
  constructor(private subjectRepository: SubjectRepository) {}

  async execute(): Promise<FindManySubjectResponse> {
    const subjects = await this.subjectRepository.findMany();

    return {
      subjects,
    };
  }
}
