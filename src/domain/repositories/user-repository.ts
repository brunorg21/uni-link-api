import { Prisma, User } from "@prisma/client";

export interface UserRepository {
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findManyTeacherByQuery(q: string | null): Promise<User[]>;
  update(id: string, data: Prisma.UserUncheckedUpdateInput): Promise<User>;
  delete(id: string): Promise<void>;
  findManyStudents(): Promise<User[]>;
  findManyTeachers(date?: string | null): Promise<User[]>;
}
