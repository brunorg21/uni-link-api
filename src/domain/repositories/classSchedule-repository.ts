import { ClassSchedule, Prisma } from "@prisma/client";

export interface ClassScheduleRepository {
  create(
    data: Prisma.ClassScheduleUncheckedCreateInput
  ): Promise<ClassSchedule>;
  edit(
    classScheduleId: string,
    data: Prisma.ClassScheduleUncheckedUpdateInput
  ): Promise<ClassSchedule>;
  delete(classScheduleId: string): Promise<void>;
  findById(classScheduleId: string): Promise<ClassSchedule | null>;
}
