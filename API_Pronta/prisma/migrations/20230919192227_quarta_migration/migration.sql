/*
  Warnings:

  - You are about to drop the column `desenvolvedora` on the `jogos` table. All the data in the column will be lost.
  - You are about to drop the column `genero` on the `jogos` table. All the data in the column will be lost.
  - Added the required column `desenvolvedora_id` to the `Jogos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genero_id` to the `Jogos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jogos` DROP COLUMN `desenvolvedora`,
    DROP COLUMN `genero`,
    ADD COLUMN `desenvolvedora_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `genero_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Jogos` ADD CONSTRAINT `Jogos_genero_id_fkey` FOREIGN KEY (`genero_id`) REFERENCES `Gêneros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jogos` ADD CONSTRAINT `Jogos_desenvolvedora_id_fkey` FOREIGN KEY (`desenvolvedora_id`) REFERENCES `Desenvolvedoras`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
