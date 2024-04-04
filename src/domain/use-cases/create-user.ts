import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../repositories/user-repository";

interface CreateUserUseCaseRequest {
  user: Prisma.UserCreateInput;
}
interface CreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    user,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const createdUser = await this.userRepository.create(user);

    return {
      user: createdUser,
    };
  }
}
