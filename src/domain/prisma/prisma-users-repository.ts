import { $Enums, Prisma, User } from "@prisma/client";
import { UserRepository } from "../repositories/user-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements UserRepository {
  async findManyTeacherByQuery(q: string): Promise<User[] | null> {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: q,
        },
        role: "TEACHER",
      },
    });

    if (!users) {
      return null;
    }

    return users;
  }

  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
