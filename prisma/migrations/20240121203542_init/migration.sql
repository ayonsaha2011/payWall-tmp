/*
  Warnings:

  - The `domains` column on the `Chatbot` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Chatbot" DROP COLUMN "domains",
ADD COLUMN     "domains" JSONB;
