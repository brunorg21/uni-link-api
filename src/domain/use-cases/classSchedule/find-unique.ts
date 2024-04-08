import { ClassScheduleRepository } from "@/domain/repositories/classSchedule-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { ClassSchedule } from "@prisma/client";

interface FindUniqueClassScheduleUseCaseRequest {
  classScheduleId: string;
}
interface FindUniqueClassScheduleUseCaseResponse {
  classSchedule: ClassSchedule;
}

export class FindUniqueClassScheduleUseCase {
  constructor(private classScheduleRepository: ClassScheduleRepository) {}

  async execute({
    classScheduleId,
  }: FindUniqueClassScheduleUseCaseRequest): Promise<FindUniqueClassScheduleUseCaseResponse> {
    const classSchedule = await this.classScheduleRepository.findById(
      classScheduleId
    );

    if (!classSchedule) {
      throw new ResourceNotFoundError();
    }

    return {
      classSchedule,
    };
  }
}
