import { ClassSchedule, Prisma } from "@prisma/client";
import { ClassScheduleRepository } from "../../repositories/classSchedule-repository";
import { UserRepository } from "../../repositories/user-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

interface EditClassScheduleUseCaseRequest {
  classScheduleId: string;
  data: Prisma.ClassScheduleUpdateInput;
}
interface EditClassScheduleUseCaseResponse {
  classSchedule: ClassSchedule;
}

export class EditClassScheduleUseCase {
  constructor(private classScheduleRepository: ClassScheduleRepository) {}

  async execute({
    classScheduleId,
    data,
  }: EditClassScheduleUseCaseRequest): Promise<EditClassScheduleUseCaseResponse> {
    const classSchedule = await this.classScheduleRepository.findById(
      classScheduleId
    );

    if (!classSchedule) {
      throw new ResourceNotFoundError();
    }

    const updatedClassSchedule = await this.classScheduleRepository.edit(
      classSchedule.id,
      data
    );

    return {
      classSchedule: updatedClassSchedule,
    };
  }
}
