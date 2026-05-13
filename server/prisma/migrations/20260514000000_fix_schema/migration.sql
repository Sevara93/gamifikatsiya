-- Drop old tables and types
DROP TABLE IF EXISTS "Progress" CASCADE;
DROP TABLE IF EXISTS "Child" CASCADE;
DROP TYPE IF EXISTS "GroupLevel" CASCADE;
DROP TYPE IF EXISTS "Lab" CASCADE;

-- CreateEnum
CREATE TYPE "GroupLevel" AS ENUM ('KICHIK', 'ORTA', 'KATTA', 'TAYYORLOV');

-- CreateEnum
CREATE TYPE "Lab" AS ENUM ('ECO_LAB', 'MIND_LAB', 'ART_LAB', 'TECH_LAB', 'LIFE_LAB');

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" "GroupLevel" NOT NULL,
    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Child" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Child_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Progress" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "lab" "Lab" NOT NULL,
    "week" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "score" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_level_key" ON "Group"("name", "level");

-- CreateIndex
CREATE UNIQUE INDEX "Child_fullName_groupId_key" ON "Child"("fullName", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Progress_childId_lab_week_key" ON "Progress"("childId", "lab", "week");

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;
