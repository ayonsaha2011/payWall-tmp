/*
  Warnings:

  - You are about to drop the column `userSessionId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_userSessionId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userSessionId";

-- CreateTable
CREATE TABLE "Chatbot" (
    "db_id" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "visibility" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "thumbnail_url" TEXT,
    "is_featured" BOOLEAN NOT NULL,
    "domains" TEXT,
    "instructions" TEXT,
    "initial_message" TEXT,
    "index_name" TEXT NOT NULL,
    "ip_limit" INTEGER,
    "ip_limit_timeframe" TEXT,
    "ip_limit_message" TEXT,
    "suggested_messages" TEXT,
    "initial_messages" TEXT,
    "user_message_color" TEXT,
    "styles" TEXT,
    "model" TEXT NOT NULL,
    "last_message_at" TIMESTAMP(3) NOT NULL,
    "num_of_characters" INTEGER NOT NULL,
    "last_trained_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "temp" INTEGER NOT NULL,
    "collect_customer_info" TEXT,
    "collect_customer_information" TEXT,
    "only_allow_on_added_domains" BOOLEAN NOT NULL,
    "notifications_settings" TEXT,
    "retraining_interval" TEXT NOT NULL,
    "custom_domains" TEXT,
    "current_training_id" TEXT,
    "db_createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "db_updatedAt" TIMESTAMP(3),

    CONSTRAINT "Chatbot_pkey" PRIMARY KEY ("db_id")
);

-- CreateTable
CREATE TABLE "ContactUs" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ContactUs_pkey" PRIMARY KEY ("id")
);
