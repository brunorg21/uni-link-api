import { Alocation, Prisma } from "@prisma/client";
import { AlocationRepository } from "../../repositories/alocation-repository";

interface CreateAlocationUseCaseRequest {
  alocation: Prisma.AlocationCreateInput;
}
interface CreateAlocationUseCaseResponse {
  alocation: Alocation;
}

export class CreateAlocationUseCase {
  constructor(private alocationRepository: AlocationRepository) {}

  async execute({
    alocation,
  }: CreateAlocationUseCaseRequest): Promise<CreateAlocationUseCaseResponse> {
    const createdAlocation = await this.alocationRepository.create(alocation);

    return {
      alocation: createdAlocation,
    };
  }
}
