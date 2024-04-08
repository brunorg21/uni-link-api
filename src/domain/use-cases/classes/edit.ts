import { Prisma, Classes } from "@prisma/client";
import { ClassesRepository } from "../../repositories/classes-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

interface EdiClassUseCaseRequest {
  classesId: string;
  data: Prisma.ClassesCreateInput;
}
interface EdiClassUseCaseResponse {
  class: Classes;
}

export class EdiClassesUseCase {
  constructor(private classesRepository: ClassesRepository) {}

  async execute({
    data,
    classesId,
  }: EdiClassUseCaseRequest): Promise<EdiClassUseCaseResponse> {
    const classes = await this.classesRepository.findById(classesId);

    if (!classes) {
      throw new ResourceNotFoundError();
    }

    const updatedClasses = await this.classesRepository.edit(classesId, data);

    return {
      class: updatedClasses,
    };
  }
}
