import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { ClassroomRepository } from "../repositories/classroom-repository";

interface DeleteClassroomUseCaseRequest {
  classroomId: string;
}

export class DeleteClassroomUseCase {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute({ classroomId }: DeleteClassroomUseCaseRequest): Promise<void> {
    const classroom = await this.classroomRepository.findById(classroomId);

    if (!classroom) {
      throw new ResourceNotFoundError();
    }

    await this.classroomRepository.delete(classroomId);
  }
}
