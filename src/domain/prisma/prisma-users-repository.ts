import { $Enums, Prisma, User } from "@prisma/client";
import { UserRepository } from "../repositories/user-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements UserRepository {
  async findManyStudents(): Promise<User[]> {
    const students = await prisma.user.findMany({
      where: {
        role: "STUDENT",
      },
    });

    return students;
  }

  async update(
    id: string,
    data: Prisma.UserUncheckedUpdateInput
  ): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return user;
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
  async findManyTeacherByQuery(q: string | null): Promise<User[]> {
    const users = await prisma.user.findMany({
      include: {
        subjects: true,
      },
      where: {
        name: {
          contains: q ? q : "",
        },
        role: "TEACHER",
      },
    });

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
