import { Classroom, Prisma } from "@prisma/client";
import { ClassroomRepository } from "../../repositories/classroom-repository";
import { UserRepository } from "../../repositories/user-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

interface EditClassroomUseCaseRequest {
  classroomId: string;
  data: Prisma.ClassroomUpdateInput;
}
interface EditClassroomUseCaseResponse {
  classroom: Classroom;
}

export class EditClassroomUseCase {
  constructor(private classRoomRepository: ClassroomRepository) {}

  async execute({
    classroomId,
    data,
  }: EditClassroomUseCaseRequest): Promise<EditClassroomUseCaseResponse> {
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
