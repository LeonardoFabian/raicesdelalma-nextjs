-- CreateTable
CREATE TABLE "public"."GiftMessage" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GiftMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GiftMessageView" (
    "id" TEXT NOT NULL,
    "giftId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GiftMessageView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GiftMessage_orderId_key" ON "public"."GiftMessage"("orderId");

-- AddForeignKey
ALTER TABLE "public"."GiftMessage" ADD CONSTRAINT "GiftMessage_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GiftMessageView" ADD CONSTRAINT "GiftMessageView_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "public"."GiftMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
