-- AlterTable
ALTER TABLE "Chatbot" ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "is_featured" DROP NOT NULL,
ALTER COLUMN "index_name" DROP NOT NULL,
ALTER COLUMN "model" DROP NOT NULL,
ALTER COLUMN "last_message_at" DROP NOT NULL,
ALTER COLUMN "num_of_characters" DROP NOT NULL,
ALTER COLUMN "last_trained_at" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "temp" DROP NOT NULL,
ALTER COLUMN "retraining_interval" DROP NOT NULL;