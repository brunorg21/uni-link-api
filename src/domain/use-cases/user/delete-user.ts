import { SubjectRepository } from "@/domain/repositories/subject-repository";
import { UserRepository } from "../../repositories/user-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

interface DeleteUserUseCaseRequest {
  id: string;
}

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: DeleteUserUseCaseRequest): Promise<void> {
    await this.userRepository.delete(id);
  }
}
