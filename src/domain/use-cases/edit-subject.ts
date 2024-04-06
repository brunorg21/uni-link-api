import { Prisma, Subject } from "@prisma/client";
import { SubjectRepository } from "../repositories/subject-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

interface EdiSubjectUseCaseRequest {
  subjectId: string;
  data: Prisma.SubjectCreateInput;
}
interface EdiSubjectUseCaseResponse {
  subject: Subject;
}

export class EdiSubjectUseCase {
  constructor(private subjectRepository: SubjectRepository) {}

  async execute({
    data,
    subjectId,
  }: EdiSubjectUseCaseRequest): Promise<EdiSubjectUseCaseResponse> {
    const subject = await this.subjectRepository.findById(subjectId);

    if (!subject) {
      throw new ResourceNotFoundError();
    }

    const updatedSubject = await this.subjectRepository.edit(subjectId, data);

    return {
      subject: updatedSubject,
    };
  }
}
