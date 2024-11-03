import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { CourseRepository } from "../../repositories/course-repository";

interface DeleteCourseUseCaseRequest {
  courseId: string;
}

export class DeleteCourseUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute({ courseId }: DeleteCourseUseCaseRequest): Promise<void> {
    const course = await this.courseRepository.findById(courseId);

    if (!course) {
      throw new ResourceNotFoundError();
    }

    await this.courseRepository.delete(courseId);
  }
}
