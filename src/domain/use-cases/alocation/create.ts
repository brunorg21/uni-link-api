import { Alocation, Prisma } from "@prisma/client";
import { AlocationRepository } from "../../repositories/alocation-repository";
import { NotAllowedError } from "@/errors/not-allowed-error";
import { ClassesRepository } from "@/domain/repositories/classes-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

interface CreateAlocationUseCaseRequest {
  alocation: Prisma.AlocationUncheckedCreateInput;
}
interface CreateAlocationUseCaseResponse {
  alocation: Alocation;
}

export class CreateAlocationUseCase {
  constructor(
    private alocationRepository: AlocationRepository,
    private classesRepository: ClassesRepository
  ) {}

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

    const classes = await this.classesRepository.findById(alocation.classesId);

    if (!classes) {
      throw new ResourceNotFoundError();
    }

    if (today >= startOfWeek && today <= endOfWeek) {
      if (!classes.reserved) {
        const createdAlocation = await this.alocationRepository.create(
          alocation
        );

        return {
          alocation: createdAlocation,
        };
      } else {
        throw new NotAllowedError();
      }
    } else {
      throw new NotAllowedError();
    }
  }
}
