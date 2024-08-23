import { PrismaUsersRepository } from "@/domain/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/domain/use-cases/user/authenticate";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { UserWithSameEmailError } from "@/errors/user-with-same-email-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const authenticateSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const { email, password } = authenticateSchema.parse(req.body);

  const userRepository = new PrismaUsersRepository();
  const authUseCase = new AuthenticateUseCase(userRepository);

  try {
    const { user } = await authUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          expiresIn: "1d",
          sub: user.id,
        },
      }
    );

    return reply.send({
      token,
      user: {
        ...user,
        password_hash: undefined,
      },
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
