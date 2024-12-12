import { Alocation } from "@prisma/client";
import { AlocationRepository } from "../../repositories/alocation-repository";

interface FindManyAlocationUseCaseResponse {
  alocations: Alocation[];
}

export class FindManyAlocationUseCase {
  constructor(private alocationRepository: AlocationRepository) {}

  async execute(): Promise<FindManyAlocationUseCaseResponse> {
    const alocations = await this.alocationRepository.findMany();

    return {
      alocations,
    };
  }
}
