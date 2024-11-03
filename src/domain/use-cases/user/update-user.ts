import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/user-repository";
import { UserWithSameEmailError } from "@/errors/user-with-same-email-error";
import { hash } from "bcrypt";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

interface UpdateUserUseCaseRequest {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "STUDENT" | "TEACHER" | "ADMIN";
  };
}
interface UpdateUserUseCaseResponse {
  user: User;
}

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    user,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userToUpdate = await this.userRepository.findById(user.id);

    if (!userToUpdate) {
      throw new ResourceNotFoundError();
    }
    

    const updatedUser = await this.userRepository.update(user.id, {
      email: user.email,
      name: user.name,
      role: user.role,
      password_hash: await hash(user.password, 6),
    });

    return {
      user: updatedUser,
    };
  }
}
