import { ClassroomRepository } from "@/domain/repositories/classroom-repository";
import { Classroom } from "@prisma/client";


interface FindManyUseCaseResponse {
  classrooms: Classroom[];
}

export class FindManyUseCase {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute(): Promise<FindManyUseCaseResponse> {
    const classrooms = await this.classroomRepository.findMany();

    

    return {
      classrooms,
    };
  }
}
