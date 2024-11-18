import { User } from "@prisma/client";

import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { UserRepository } from "@/domain/repositories/user-repository";

interface FindManyStudentsUseCaseResponse {
  users: User[];
}

export class FindManyStudentsUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<FindManyStudentsUseCaseResponse> {
    const users = await this.userRepository.findManyStudents();

    if (!users) {
      throw new ResourceNotFoundError();
    }

    return {
      users,
    };
  }
}
