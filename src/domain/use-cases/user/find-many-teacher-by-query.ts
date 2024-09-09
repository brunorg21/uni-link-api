import { User } from "@prisma/client";

import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { UserRepository } from "@/domain/repositories/user-repository";

interface FindManyTeacherByQueryUseCaseRequest {
  q: string | null;
}
interface FindManyTeacherByQueryUseCaseResponse {
  users: User[];
}

export class FindManyTeacherByQueryUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    q,
  }: FindManyTeacherByQueryUseCaseRequest): Promise<FindManyTeacherByQueryUseCaseResponse> {
    const users = await this.userRepository.findManyTeacherByQuery(q);

    if (!users) {
      throw new ResourceNotFoundError();
    }

    return {
      users,
    };
  }
}
