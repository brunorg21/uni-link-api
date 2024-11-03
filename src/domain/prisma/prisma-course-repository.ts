import { Course, Prisma } from "@prisma/client";
import { CourseRepository } from "../repositories/course-repository";
import { prisma } from "@/lib/prisma";

export class PrismaCourseRepository implements CourseRepository {
  async create(data: Prisma.CourseUncheckedCreateInput): Promise<Course> {
    const course = await prisma.course.create({
      data,
    });

    return course;
  }
  async edit(
    courseId: string,
    data: Prisma.CourseUncheckedUpdateInput
  ): Promise<Course> {
    const course = await prisma.course.update({
      where: {
        id: courseId,
      },
      data,
    });

    return course;
  }
  async delete(courseId: string): Promise<void> {
    await prisma.course.delete({
      where: {
        id: courseId,
      },
    });
  }
  async findById(courseId: string): Promise<Course | null> {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      return null;
    }

    return course;
  }

  async findMany(): Promise<Course[]> {
    const courses = await prisma.course.findMany({
      include: {
        subjects: true,
      },
    });

    return courses;
  }
}
