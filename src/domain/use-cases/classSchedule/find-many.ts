import { ClassScheduleRepository } from "@/domain/repositories/classSchedule-repository";
import { ClassSchedule } from "@prisma/client";

interface FindManyClassScheduleResponse {
  classschedules: ClassSchedule[];
}

export class FindManyClassSchedule {
  constructor(private classscheduleRepository: ClassScheduleRepository) {}

  async execute(): Promise<FindManyClassScheduleResponse> {
    const classschedules = await this.classscheduleRepository.findMany();

    return {
      classschedules,
    };
  }
}
