import { Alocation, Prisma } from "@prisma/client";
import { AlocationRepository } from "../../repositories/alocation-repository";
import { NotAllowedError } from "@/errors/not-allowed-error";

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
    var today = new Date();
    var startOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    );
    var endOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 6
    );

    if (today >= startOfWeek && today <= endOfWeek) {
      const createdAlocation = await this.alocationRepository.create(alocation);

      return {
        alocation: createdAlocation,
      };
    } else {
      throw new NotAllowedError();
    }
  }
}
