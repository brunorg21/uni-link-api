import { Prisma, Alocation } from "@prisma/client";
import { AlocationRepository } from "../../repositories/alocation-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

interface EdiAlocationUseCaseRequest {
  alocationId: string;
  data: Prisma.AlocationCreateInput;
}
interface EdiAlocationUseCaseResponse {
  alocation: Alocation;
}

export class EdiAlocationUseCase {
  constructor(private alocationRepository: AlocationRepository) {}

  async execute({
    data,
    alocationId,
  }: EdiAlocationUseCaseRequest): Promise<EdiAlocationUseCaseResponse> {
    const alocation = await this.alocationRepository.findById(alocationId);

    if (!alocation) {
      throw new ResourceNotFoundError();
    }

    const updatedAlocation = await this.alocationRepository.edit(
      alocationId,
      data
    );

    return {
      alocation: updatedAlocation,
    };
  }
}
