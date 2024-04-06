import { Classroom, Prisma } from "@prisma/client";
import { UserRepository } from "../../repositories/user-repository";
import { ClassroomRepository } from "../../repositories/classroom-repository";
import { UserNotFoundError } from "@/errors/user-not-found-error";

interface CreateClassroomUseCaseRequest {
  classroom: Prisma.ClassroomCreateInput;
}
interface CreateClassroomUseCaseResponse {
  classroom: Classroom;
}

export class CreateClassroomUseCase {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute({
    classroom,
  }: CreateClassroomUseCaseRequest): Promise<CreateClassroomUseCaseResponse> {
    const createdClassroom = await this.classroomRepository.create(classroom);

    return {
      classroom: createdClassroom,
    };
  }
}
