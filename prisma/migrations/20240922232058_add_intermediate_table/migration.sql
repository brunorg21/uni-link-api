-- CreateTable
CREATE TABLE "class_schedule_to_classes" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "classScheduleId" TEXT NOT NULL,

    CONSTRAINT "class_schedule_to_classes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "class_schedule_to_classes" ADD CONSTRAINT "class_schedule_to_classes_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_schedule_to_classes" ADD CONSTRAINT "class_schedule_to_classes_classScheduleId_fkey" FOREIGN KEY ("classScheduleId") REFERENCES "classSchedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
