import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { AlocationRepository } from "../../repositories/alocation-repository";

interface DeleteAlocationUseCaseRequest {
  alocationId: string;
}

export class DeleteAlocationUseCase {
  constructor(private alocationRepository: AlocationRepository) {}

  async execute({ alocationId }: DeleteAlocationUseCaseRequest): Promise<void> {
    const alocation = await this.alocationRepository.findById(alocationId);

    if (!alocation) {
      throw new ResourceNotFoundError();
    }

    await this.alocationRepository.delete(alocationId);
  }
}
