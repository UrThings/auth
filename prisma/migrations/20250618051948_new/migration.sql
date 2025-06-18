/*
  Warnings:

  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Result` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_userId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_QuestionId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_userId_fkey";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "Result";

-- CreateTable
CREATE TABLE "UserInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "work_city" TEXT,
    "webUrl" TEXT,
    "about" TEXT,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkImage" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT,
    "workExperienceId" TEXT NOT NULL,

    CONSTRAINT "WorkImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work_experience" (
    "id" TEXT NOT NULL,
    "startYear" TEXT,
    "endYear" TEXT,
    "Company" TEXT,
    "City" TEXT,
    "url" TEXT,
    "userInfoId" TEXT NOT NULL,

    CONSTRAINT "Work_experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Writing" (
    "id" TEXT NOT NULL,
    "userInfoId" TEXT NOT NULL,
    "year" TEXT,
    "title" TEXT,
    "teamInfo" TEXT,
    "url" TEXT,
    "url2" TEXT,

    CONSTRAINT "Writing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speaking" (
    "id" TEXT NOT NULL,
    "userInfoId" TEXT NOT NULL,
    "year" TEXT,
    "title" TEXT,
    "city" TEXT,
    "url" TEXT,
    "url2" TEXT,

    CONSTRAINT "Speaking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SideProject" (
    "id" TEXT NOT NULL,
    "userInfoId" TEXT NOT NULL,
    "year" TEXT,
    "title" TEXT,
    "url" TEXT,

    CONSTRAINT "SideProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "userInfoId" TEXT NOT NULL,
    "startYear" TEXT,
    "endYear" TEXT,
    "title" TEXT,
    "city" TEXT,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "userInfoId" TEXT NOT NULL,
    "Threads" TEXT,
    "Figma" TEXT,
    "Instagram" TEXT,
    "Bluesky" TEXT,
    "Mastodon" TEXT,
    "X" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkImage" ADD CONSTRAINT "WorkImage_workExperienceId_fkey" FOREIGN KEY ("workExperienceId") REFERENCES "Work_experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work_experience" ADD CONSTRAINT "Work_experience_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Writing" ADD CONSTRAINT "Writing_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Speaking" ADD CONSTRAINT "Speaking_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SideProject" ADD CONSTRAINT "SideProject_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
