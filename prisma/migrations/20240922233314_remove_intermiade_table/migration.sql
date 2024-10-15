/*
  Warnings:

  - You are about to drop the `class_schedule_to_classes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "class_schedule_to_classes" DROP CONSTRAINT "class_schedule_to_classes_classId_fkey";

-- DropForeignKey
ALTER TABLE "class_schedule_to_classes" DROP CONSTRAINT "class_schedule_to_classes_classScheduleId_fkey";

-- DropTable
DROP TABLE "class_schedule_to_classes";
