/*
  Warnings:

  - Added the required column `classDate` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classroomId` to the `classes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classes" ADD COLUMN     "classDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "classroomId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classrooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
