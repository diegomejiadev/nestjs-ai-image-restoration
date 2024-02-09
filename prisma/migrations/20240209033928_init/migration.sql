/*
  Warnings:

  - You are about to drop the column `token` on the `AccessToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[api_key]` on the table `AccessToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `api_key` to the `AccessToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AccessToken_token_key";

-- AlterTable
ALTER TABLE "AccessToken" DROP COLUMN "token",
ADD COLUMN     "api_key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AccessToken_api_key_key" ON "AccessToken"("api_key");
