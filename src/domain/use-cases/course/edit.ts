import { Prisma, Course } from "@prisma/client";
import { CourseRepository } from "../../repositories/course-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

interface EditCourseUseCaseRequest {
  courseId: string;
  data: Prisma.CourseUncheckedUpdateInput;
}
interface EditCourseUseCaseResponse {
  course: Course;
}

export class EditCourseUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute({
    data,
    courseId,
  }: EditCourseUseCaseRequest): Promise<EditCourseUseCaseResponse> {
    const course = await this.courseRepository.findById(courseId);

    if (!course) {
      throw new ResourceNotFoundError();
    }

    const updatedCourse = await this.courseRepository.edit(courseId, data);

    return {
      course: updatedCourse,
    };
  }
}
