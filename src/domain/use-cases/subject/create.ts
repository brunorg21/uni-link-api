import { Prisma, Subject } from "@prisma/client";
import { SubjectRepository } from "../../repositories/subject-repository";

interface CreateSubjectUseCaseRequest {
  data: Prisma.SubjectCreateManyInput;
}
interface CreateSubjectUseCaseResponse {
  subject: Subject;
}

export class CreateSubjectUseCase {
  constructor(private subjectRepository: SubjectRepository) {}

  async execute({
    data,
  }: CreateSubjectUseCaseRequest): Promise<CreateSubjectUseCaseResponse> {
    const createdSubject = await this.subjectRepository.create(data);

    return {
      subject: createdSubject,
    };
  }
}
