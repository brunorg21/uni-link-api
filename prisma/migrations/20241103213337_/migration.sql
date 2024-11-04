-- DropForeignKey
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_courseId_fkey";

-- AlterTable
ALTER TABLE "subjects" ALTER COLUMN "courseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
