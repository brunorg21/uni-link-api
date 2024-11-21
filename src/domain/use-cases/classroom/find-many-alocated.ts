import { ClassroomRepository } from "@/domain/repositories/classroom-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { Classroom } from "@prisma/client";

interface FindManyAlocatedCaseRequest {
  date?: string | null;
}
interface FindManyAlocatedCaseResponse {
  classrooms: Classroom[];
}

export class FindManyAlocatedCase {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute({
    date,
  }: FindManyAlocatedCaseRequest): Promise<FindManyAlocatedCaseResponse> {
    const classrooms = await this.classroomRepository.findManyAlocated(date);

    if (!classrooms) {
      throw new ResourceNotFoundError();
    }

    return {
      classrooms,
    };
  }
}
