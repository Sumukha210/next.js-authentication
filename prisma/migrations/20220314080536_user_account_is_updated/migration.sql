/*
  Warnings:

  - The primary key for the `useraccount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `access_token` on the `useraccount` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `useraccount` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `useraccount` table. All the data in the column will be lost.
  - The required column `id` was added to the `UserAccount` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `useraccount` DROP PRIMARY KEY,
    DROP COLUMN `access_token`,
    DROP COLUMN `refresh_token`,
    DROP COLUMN `userId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `refresh_token_version` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);
