import { ClassroomRepository } from "@/domain/repositories/classroom-repository";
import { Classroom } from "@prisma/client";

interface FindManyClassroomResponse {
  classrooms: Classroom[];
}

export class FindManyClassroom {
  constructor(private classroomRepository: ClassroomRepository) {}

  async execute(): Promise<FindManyClassroomResponse> {
    const classrooms = await this.classroomRepository.findMany();

    return {
      classrooms,
    };
  }
}
