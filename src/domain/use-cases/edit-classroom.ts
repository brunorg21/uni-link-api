import { Classroom, Prisma } from "@prisma/client";
import { ClassroomRepository } from "../repositories/classroom-repository";
import { UserRepository } from "../repositories/user-repository";
import { UserNotFoundError } from "@/errors/user-not-found-error";
import { NotAllowedError } from "@/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

interface EditClassroomUseCaseRequest {
  classroomId: string;
  data: Prisma.ClassroomUpdateInput;
  userId: string;
}
interface EditClassroomUseCaseResponse {
  classroom: Classroom;
}

export class EditClassroomUseCase {
  constructor(
    private classRoomRepository: ClassroomRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    classroomId,
    data,
    userId,
  }: EditClassroomUseCaseRequest): Promise<EditClassroomUseCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (user.role !== "ADMIN") {
      throw new NotAllowedError();
    }

    const classroom = await this.classRoomRepository.findById(classroomId);

    if (!classroom) {
      throw new ResourceNotFoundError();
    }

    const updatedClassroom = await this.classRoomRepository.edit(
      classroom.id,
      data
    );

    return {
      classroom: updatedClassroom,
    };
  }
}
