-- DropForeignKey
ALTER TABLE "alocations" DROP CONSTRAINT "alocations_classesId_fkey";

-- AddForeignKey
ALTER TABLE "alocations" ADD CONSTRAINT "alocations_classesId_fkey" FOREIGN KEY ("classesId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
