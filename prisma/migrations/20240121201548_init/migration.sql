/*
  Warnings:

  - You are about to drop the column `initial_messages` on the `Chatbot` table. All the data in the column will be lost.
  - The `initial_message` column on the `Chatbot` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Chatbot" DROP COLUMN "initial_messages",
DROP COLUMN "initial_message",
ADD COLUMN     "initial_message" JSONB;
