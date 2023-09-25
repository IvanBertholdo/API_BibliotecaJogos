/*
  Warnings:

  - The primary key for the `desenvolvedoras` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `gêneros` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `relacionamento` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `desenvolvedoras` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `gêneros` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `relacionamento` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
