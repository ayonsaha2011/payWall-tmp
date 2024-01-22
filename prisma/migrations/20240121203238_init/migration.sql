/*
  Warnings:

  - The `collect_customer_information` column on the `Chatbot` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Chatbot" DROP COLUMN "collect_customer_information",
ADD COLUMN     "collect_customer_information" JSONB,
ALTER COLUMN "ip_limit_message" SET DATA TYPE TEXT;
