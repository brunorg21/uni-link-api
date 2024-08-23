import { PrismaUsersRepository } from "@/domain/prisma/prisma-users-repository";
import { CreateUserUseCase } from "@/domain/use-cases/user/create-user";
import { UserWithSameEmailError } from "@/errors/user-with-same-email-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const registerUserSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  password: z.string().max(8),
  role: z.enum(["ADMIN", "TEACHER", "STUDENT"]).default("STUDENT"),
});

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const { email, name, password, role } = registerUserSchema.parse(req.body);

  const userRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);

  try {
    await createUserUseCase.execute({
      user: {
        email,
        name,
        password,
        role,
      },
    });
  } catch (error) {
    if (error instanceof UserWithSameEmailError) {
      return reply.status(409).send({ message: error.message });
    }

    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
