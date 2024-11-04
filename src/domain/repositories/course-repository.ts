import { Classes, Course, Prisma, Subject } from "@prisma/client";

export interface CourseRepository {
  create(data: Prisma.CourseUncheckedCreateInput): Promise<Course>;
  edit(
    courseId: string,
    data: Prisma.CourseUncheckedUpdateInput
  ): Promise<Course>;
  delete(courseId: string): Promise<void>;
  findById(courseId: string): Promise<Course | null>;
  findMany(): Promise<Course[]>;
}
