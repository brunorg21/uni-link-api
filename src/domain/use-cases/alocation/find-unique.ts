import { Alocation } from "@prisma/client";
import { AlocationRepository } from "../../repositories/alocation-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

interface FindUniqueAlocationUseCaseRequest {
  alocationId: string;
}
interface FindUniqueAlocationUseCaseResponse {
  alocation: Alocation;
}

export class FindUniqueAlocationUseCase {
  constructor(private alocationRepository: AlocationRepository) {}

  async execute({
    alocationId,
  }: FindUniqueAlocationUseCaseRequest): Promise<FindUniqueAlocationUseCaseResponse> {
    const alocation = await this.alocationRepository.findById(alocationId);

    if (!alocation) {
      throw new ResourceNotFoundError();
    }

    return {
      alocation,
    };
  }
}
