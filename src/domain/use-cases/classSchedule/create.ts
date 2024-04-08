import { ClassSchedule, Prisma } from "@prisma/client";

import { ClassScheduleRepository } from "../../repositories/classSchedule-repository";

interface CreateClassScheduleUseCaseRequest {
  classSchedule: Prisma.ClassScheduleCreateInput;
}
interface CreateClassScheduleUseCaseResponse {
  classSchedule: ClassSchedule;
}

export class CreateClassScheduleUseCase {
  constructor(private classScheduleRepository: ClassScheduleRepository) {}

  async execute({
    classSchedule,
  }: CreateClassScheduleUseCaseRequest): Promise<CreateClassScheduleUseCaseResponse> {
    const createdClassSchedule = await this.classScheduleRepository.create(
      classSchedule
    );

    return {
      classSchedule: createdClassSchedule,
    };
  }
}
