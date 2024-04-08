import { Prisma, Subject } from "@prisma/client";
import { SubjectRepository } from "../../repositories/subject-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

interface FindUniqueSubjectUseCaseRequest {
  subjectId: string;
}
interface FindUniqueSubjectUseCaseResponse {
  subject: Subject;
}

export class FindUniqueSubjectUseCase {
  constructor(private subjectRepository: SubjectRepository) {}

  async execute({
    subjectId,
  }: FindUniqueSubjectUseCaseRequest): Promise<FindUniqueSubjectUseCaseResponse> {
    const subject = await this.subjectRepository.findById(subjectId);

    if (!subject) {
      throw new ResourceNotFoundError();
    }

    return {
      subject,
    };
  }
}
