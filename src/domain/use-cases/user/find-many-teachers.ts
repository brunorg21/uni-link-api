import { User } from "@prisma/client";

import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { UserRepository } from "@/domain/repositories/user-repository";

interface FindManyTeachersUseCaseRequest {
  date: string | null;
}
interface FindManyTeachersUseCaseResponse {
  users: User[];
}

export class FindManyTeachersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    date,
  }: FindManyTeachersUseCaseRequest): Promise<FindManyTeachersUseCaseResponse> {
    const users = await this.userRepository.findManyTeachers(date);

    if (!users) {
      throw new ResourceNotFoundError();
    }

    return {
      users,
    };
  }
}
