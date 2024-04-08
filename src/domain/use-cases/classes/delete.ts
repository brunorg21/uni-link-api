import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { ClassesRepository } from "../../repositories/classes-repository";

interface DeleteClassUseCaseRequest {
  classId: string;
}

export class DeleteClassUseCase {
  constructor(private classesRepository: ClassesRepository) {}

  async execute({ classId }: DeleteClassUseCaseRequest): Promise<void> {
    const classes = await this.classesRepository.findById(classId);

    if (!classes) {
      throw new ResourceNotFoundError();
    }

    await this.classesRepository.delete(classId);
  }
}
