-- CreateTable
CREATE TABLE "WalletNonce" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "chainType" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "chainType" TEXT NOT NULL,
    "uid" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nickname" TEXT,
    "avatarUrl" TEXT,
    "email" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "WalletNonce_address_chainType_key" ON "WalletNonce"("address", "chainType");

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "User_address_chainType_key" ON "User"("address", "chainType");
