/*
  Warnings:

  - The `ip_limit_timeframe` column on the `Chatbot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ip_limit_message` column on the `Chatbot` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Chatbot" DROP COLUMN "ip_limit_timeframe",
ADD COLUMN     "ip_limit_timeframe" INTEGER,
DROP COLUMN "ip_limit_message",
ADD COLUMN     "ip_limit_message" INTEGER;
