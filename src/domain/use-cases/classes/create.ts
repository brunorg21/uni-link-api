import { ClassesRepository } from "@/domain/repositories/classes-repository";
import { Classes, Prisma } from "@prisma/client";

interface CreateClassUseCaseRequest {
  data: Prisma.ClassesUncheckedCreateInput;
}
interface CreateClassUseCaseResponse {
  class: Classes;
}

export class CreateClassUseCase {
  constructor(private classesRepository: ClassesRepository) {}

  async execute({
    data,
  }: CreateClassUseCaseRequest): Promise<CreateClassUseCaseResponse> {
    const classes = await this.classesRepository.create(data);

    return {
      class: classes,
    };
  }
}
