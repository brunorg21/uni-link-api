import { ClassesRepository } from "@/domain/repositories/classes-repository";
import { Classes } from "@prisma/client";

interface FindManyClassesResponse {
  classes: Classes[];
}

export class FindManyClasses {
  constructor(private classesRepository: ClassesRepository) {}

  async execute(date?: string | null): Promise<FindManyClassesResponse> {
    const classes = await this.classesRepository.findMany(date);

    return {
      classes,
    };
  }
}
