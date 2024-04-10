import { Classes, User } from "@prisma/client";

import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { UserRepository } from "@/domain/repositories/user-repository";
import { ClassesRepository } from "@/domain/repositories/classes-repository";
import { SubjectRepository } from "@/domain/repositories/subject-repository";

interface FindManyByStudentUseCaseRequest {
  studentId: string;
}
interface FindManyByStudentUseCaseResponse {
  classes: Classes[];
}

export class FindManyByStudentUseCase {
  constructor(
    private classesRepository: ClassesRepository,
    private subjectRepository: SubjectRepository
  ) {}

  async execute({
    studentId,
  }: FindManyByStudentUseCaseRequest): Promise<FindManyByStudentUseCaseResponse> {
    const subjects = await this.subjectRepository.findByStudent(studentId);

    if (!subjects) {
      throw new ResourceNotFoundError();
    }

    const classes = await this.classesRepository.findManyByStudent(subjects);

    if (!classes) {
      throw new ResourceNotFoundError();
    }

    return {
      classes,
    };
  }
}
