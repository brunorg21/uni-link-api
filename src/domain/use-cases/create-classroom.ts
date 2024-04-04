import { Classroom, Prisma } from "@prisma/client";
import { UserRepository } from "../repositories/user-repository";
import { ClassroomRepository } from "../repositories/classroom-repository";
import { UserNotFoundError } from "@/errors/user-not-found-error";
import { NotAllowedError } from "@/errors/not-allowed-error";

interface CreateClassroomUseCaseRequest {
  classroom: Prisma.ClassroomCreateInput;
  userId: string;
}
interface CreateClassroomUseCaseResponse {
  classroom: Classroom;
}

export class CreateClassroomUseCase {
  constructor(
    private classroomRepository: ClassroomRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    classroom,
    userId,
  }: CreateClassroomUseCaseRequest): Promise<CreateClassroomUseCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (user.role !== "ADMIN") {
      throw new NotAllowedError();
    }

    const createdClassroom = await this.classroomRepository.create(classroom);

    return {
      classroom: createdClassroom,
    };
  }
}