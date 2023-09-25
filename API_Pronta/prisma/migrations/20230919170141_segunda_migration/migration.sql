/*
  Warnings:

  - You are about to drop the `jogo_genero_desenvolvedora` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `jogo_genero_desenvolvedora`;

-- CreateTable
CREATE TABLE `Relacionamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `editora` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
