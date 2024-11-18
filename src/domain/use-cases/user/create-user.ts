import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../../repositories/user-repository";
import { UserWithSameEmailError } from "@/errors/user-with-same-email-error";
import { hash } from "bcrypt";

interface CreateUserUseCaseRequest {
  user: {
    name: string;
    email: string;
    password: string;
    role: "STUDENT" | "TEACHER" | "ADMIN";
    courseId?: string;
  };
}
interface CreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    user,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(user.email);

    if (userWithSameEmail) {
      throw new UserWithSameEmailError(user.email);
    }

    const passwordHash = await hash(user.password, 6);

    const createdUser = await this.userRepository.create({
      email: user.email,
      name: user.name,
      password_hash: passwordHash,
      role: user.role,
      courseId: user.courseId,
    });

    return {
      user: createdUser,
    };
  }
}
