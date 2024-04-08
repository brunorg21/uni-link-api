import { ClassSchedule, Prisma } from "@prisma/client";

export interface ClassScheduleRepository {
  create(data: Prisma.ClassScheduleCreateInput): Promise<ClassSchedule>;
  edit(
    classScheduleId: string,
    data: Prisma.ClassScheduleUpdateInput
  ): Promise<ClassSchedule>;
  delete(classScheduleId: string): Promise<void>;
  findById(classScheduleId: string): Promise<ClassSchedule | null>;
}
