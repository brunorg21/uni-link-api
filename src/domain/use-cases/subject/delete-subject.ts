import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { SubjectRepository } from "../../repositories/subject-repository";

interface DeleteSubjectUseCaseRequest {
  subjectId: string;
}

export class DeleteSubjectUseCase {
  constructor(private subjectRepository: SubjectRepository) {}

  async execute({ subjectId }: DeleteSubjectUseCaseRequest): Promise<void> {
    const subject = await this.subjectRepository.findById(subjectId);

    if (!subject) {
      throw new ResourceNotFoundError();
    }

    await this.subjectRepository.delete(subjectId);
  }
}
