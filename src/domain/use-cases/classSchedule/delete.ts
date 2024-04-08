import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { ClassScheduleRepository } from "../../repositories/classSchedule-repository";

interface DeleteClassScheduleUseCaseRequest {
  classScheduleId: string;
}

export class DeleteClassScheduleUseCase {
  constructor(private classScheduleRepository: ClassScheduleRepository) {}

  async execute({
    classScheduleId,
  }: DeleteClassScheduleUseCaseRequest): Promise<void> {
    const classschedule = await this.classScheduleRepository.findById(
      classScheduleId
    );

    if (!classschedule) {
      throw new ResourceNotFoundError();
    }

    await this.classScheduleRepository.delete(classScheduleId);
  }
}
