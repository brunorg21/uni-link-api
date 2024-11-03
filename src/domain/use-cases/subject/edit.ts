import { Prisma, Subject } from "@prisma/client";
import { SubjectRepository } from "../../repositories/subject-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

interface EditSubjectUseCaseRequest {
  subjectId: string;
  data: Prisma.SubjectUncheckedUpdateInput;
}
interface EditSubjectUseCaseResponse {
  subject: Subject;
}

export class EditSubjectUseCase {
  constructor(private subjectRepository: SubjectRepository) {}

  async execute({
    data,
    subjectId,
  }: EditSubjectUseCaseRequest): Promise<EditSubjectUseCaseResponse> {
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
