import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user-repository";
import { UserNotFoundError } from "@/errors/user-not-found-error";
import { compare } from "bcrypt";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}
interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const passwordMatch = await compare(password, user.password_hash);

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
