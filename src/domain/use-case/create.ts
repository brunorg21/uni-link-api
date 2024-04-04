import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../repositories/user-repository";

interface CreateUseCaseRequest {
  user: Prisma.UserCreateInput;
}
interface CreateUseCaseResponse {
  user: User;
}

export class CreateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    user,
  }: CreateUseCaseRequest): Promise<CreateUseCaseResponse> {
    const createdUser = await this.userRepository.create(user);

    return {
      user: createdUser,
    };
  }
}
