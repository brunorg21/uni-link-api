import { ClassroomRepository } from "@/domain/repositories/classroom-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { Classroom } from "@prisma/client";

interface FindUniqueClassroomUseCaseRequest {
  classroomId: string;
}
interface FindUniqueClassroomUseCaseResponse {
  classroom: Classroom;
}

export class FindUniqueClassroomUseCase {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute({ classroomId }: FindUniqueClassroomUseCaseRequest) {
    const classroom = await this.classroomRepository.findById(classroomId);

    if (!classroom) {
      throw new ResourceNotFoundError();
    }

    return {
      classroom,
    };
  }
}
