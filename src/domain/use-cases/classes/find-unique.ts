import { ClassesRepository } from "@/domain/repositories/classes-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { Classes } from "@prisma/client";

interface FindUniqueClassesUseCaseRequest {
  classId: string;
}
interface FindUniqueClassesUseCaseResponse {
  class: Classes;
}

export class FindUniqueClassUseCase {
  constructor(private classesRepository: ClassesRepository) {}

  async execute({
    classId,
  }: FindUniqueClassesUseCaseRequest): Promise<FindUniqueClassesUseCaseResponse> {
    const classes = await this.classesRepository.findById(classId);

    if (!classes) {
      throw new ResourceNotFoundError();
    }

    return {
      class: classes,
    };
  }
}
