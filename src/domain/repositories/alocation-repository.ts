import { Alocation, Prisma } from "@prisma/client";

export interface AlocationRepository {
  create(data: Prisma.AlocationCreateInput): Promise<Alocation>;
  edit(
    alocationId: string,
    data: Prisma.AlocationUpdateInput
  ): Promise<Alocation>;
  delete(alocationId: string): Promise<void>;
  findById(alocationId: string): Promise<Alocation | null>;
}
