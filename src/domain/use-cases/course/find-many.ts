import { CourseRepository } from "@/domain/repositories/course-repository";
import { Course } from "@prisma/client";

interface FindManyCourseResponse {
  courses: Course[];
}

export class FindManyCourse {
  constructor(private courseRepository: CourseRepository) {}

  async execute(): Promise<FindManyCourseResponse> {
    const courses = await this.courseRepository.findMany();

    return {
      courses,
    };
  }
}
