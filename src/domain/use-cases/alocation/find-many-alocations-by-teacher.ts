import { Alocation } from "@prisma/client";
import { AlocationRepository } from "../../repositories/alocation-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

interface FindManyByTeacherAlocationUseCaseRequest {
  teacherId: string;
}
interface FindManyByTeacherAlocationUseCaseResponse {
  alocations: Alocation[];
}

export class FindManyByTeacherAlocationUseCase {
  constructor(private alocationRepository: AlocationRepository) {}

  async execute({
    teacherId,
  }: FindManyByTeacherAlocationUseCaseRequest): Promise<FindManyByTeacherAlocationUseCaseResponse> {
    const alocations = await this.alocationRepository.findManyByTeacher(
      teacherId
    );

    return {
      alocations,
    };
  }
}
