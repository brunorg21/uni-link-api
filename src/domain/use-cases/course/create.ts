import { Prisma, Course } from "@prisma/client";
import { CourseRepository } from "../../repositories/course-repository";

interface CreateCourseUseCaseRequest {
  data: Prisma.CourseCreateManyInput;
}
interface CreateCourseUseCaseResponse {
  course: Course;
}

export class CreateCourseUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute({
    data,
  }: CreateCourseUseCaseRequest): Promise<CreateCourseUseCaseResponse> {
    const createdCourse = await this.courseRepository.create(data);

    return {
      course: createdCourse,
    };
  }
}
