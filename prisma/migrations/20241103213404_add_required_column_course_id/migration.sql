/*
  Warnings:

  - Made the column `courseId` on table `subjects` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_courseId_fkey";

-- AlterTable
ALTER TABLE "subjects" ALTER COLUMN "courseId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
