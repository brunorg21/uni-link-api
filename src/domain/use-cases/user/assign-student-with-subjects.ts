import { UserRepository } from "../../repositories/user-repository";
import { hash } from "bcrypt";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { SubjectRepository } from "@/domain/repositories/subject-repository";

interface AssignStudentWithSubjectsUseCaseRequest {
  id: string;
  semester: number;
}

export class AssignStudentWithSubjectsUseCase {
  constructor(
    private userRepository: UserRepository,
    private subjectRepository: SubjectRepository
  ) {}

  async execute({
    id,
    semester,
  }: AssignStudentWithSubjectsUseCaseRequest): Promise<void> {
    const userToUpdate = await this.userRepository.findById(id);

    if (!userToUpdate) {
      throw new ResourceNotFoundError();
    }

    const subjectsBySemester = await this.subjectRepository.findBySemester(
      semester,
      userToUpdate.courseId!
    );

    await this.userRepository.update(id, {
      subjects: {
        connect: subjectsBySemester,
      },
    });
  }
}
