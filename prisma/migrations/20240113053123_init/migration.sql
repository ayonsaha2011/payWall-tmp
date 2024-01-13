-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userSessionId" VARCHAR(128) NOT NULL,
    "email" VARCHAR(100),
    "name" VARCHAR(128),
    "password" VARCHAR(128),
    "firstName" VARCHAR(64),
    "lastName" VARCHAR(64),
    "image" VARCHAR(128),
    "gender" VARCHAR(32),
    "phone" VARCHAR(32),
    "birthday" TIMESTAMP(3),
    "address" TEXT,
    "role" SMALLINT NOT NULL DEFAULT 2,
    "token" TEXT,
    "tokenExpiration" TIMESTAMP(3),
    "isEmailVerified" BOOLEAN DEFAULT false,
    "isActive" BOOLEAN DEFAULT true,
    "deleted" BOOLEAN DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userSessionId_key" ON "User"("userSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");
