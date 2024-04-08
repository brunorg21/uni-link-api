import { ClassroomRepository } from "@/domain/repositories/classroom-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { Classroom } from "@prisma/client";

interface FindManyByTeacherUseCaseRequest {
  teacherId: string;
}
interface FindManyByTeacherUseCaseResponse {
  classrooms: Classroom[];
}

export class FindManyByTeacherUseCase {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute({
    teacherId,
  }: FindManyByTeacherUseCaseRequest): Promise<FindManyByTeacherUseCaseResponse> {
    const classrooms = await this.classroomRepository.findByTeacher(teacherId);

    if (!classrooms) {
      throw new ResourceNotFoundError();
    }

    return {
      classrooms,
    };
  }
}
