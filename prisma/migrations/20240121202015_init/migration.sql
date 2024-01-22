-- AlterTable
ALTER TABLE "Chatbot" ADD COLUMN     "initial_messages" JSONB,
ALTER COLUMN "initial_message" SET DATA TYPE TEXT;
