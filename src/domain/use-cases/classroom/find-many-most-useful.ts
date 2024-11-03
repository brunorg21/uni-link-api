import { ClassroomRepository } from "@/domain/repositories/classroom-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { Classroom } from "@prisma/client";

interface FindManyMostUsefulUseCaseRequest {
  date?: string | null;
}
interface FindManyMostUsefulUseCaseResponse {
  classrooms: Classroom[];
}

export class FindManyMostUsefulUseCase {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute({
    date,
  }: FindManyMostUsefulUseCaseRequest): Promise<FindManyMostUsefulUseCaseResponse> {
    const classrooms = await this.classroomRepository.findManyMostUseful(date);

    if (!classrooms) {
      throw new ResourceNotFoundError();
    }

    return {
      classrooms,
    };
  }
}
