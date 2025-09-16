/*
  Warnings:

  - The `extraPrice` column on the `ProductSize` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `roles` on the `users` table. All the data in the column will be lost.
  - Made the column `price` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stock` on table `ProductSize` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('admin', 'user', 'vendor', 'salesperson', 'salesrep', 'affiliate', 'distributor', 'client');

-- CreateEnum
CREATE TYPE "public"."FulfillmentMode" AS ENUM ('PREMADE', 'MAKE_TO_ORDER');

-- CreateEnum
CREATE TYPE "public"."BusinessType" AS ENUM ('AFFILIATED_FINANCE_COMPANY', 'BANKS_AND_INSURANCE_COMPANIES', 'CIGARETTE_AND_OTHER_TOBACCO_PRODUCTS', 'CONTRACTORS_REAL_ESTATE_DEVELOPERS', 'HEALTH_CARE_FACILITIES', 'HOTEL_MOTEL_TOURIST_HOME', 'JUNK_DEALER_NON_RESIDENT', 'LESSORS_OF_TANGIBLE_PERSONAL_PROPERTY', 'MANUFACTURER_OF_VARIOUS_PRODUCTS', 'MOTOR_VEHICLE_DEALER', 'OCCUPATIONS_PROFESSIONAL_SERVICE', 'PUBLIC_UTILITIES', 'RETAIL_WHOLESALE', 'SHORT_TERM_RENTAL');

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "fulfillmentMode" "public"."FulfillmentMode" NOT NULL DEFAULT 'PREMADE',
ADD COLUMN     "isConfigurable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "weightGrams" INTEGER,
ALTER COLUMN "price" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."ProductSize" DROP COLUMN "extraPrice",
ADD COLUMN     "extraPrice" DECIMAL(10,2),
ALTER COLUMN "stock" SET NOT NULL,
ALTER COLUMN "stock" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "roles",
ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'user',
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "public"."UserAddress" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "address2" TEXT,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" TEXT NOT NULL,
    "subTotal" DECIMAL(10,2) NOT NULL,
    "shipping" DECIMAL(10,2) NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "totalItems" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "placedAt" TIMESTAMP(3),
    "shippedAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "transactionId" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "basePrice" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(10,2) NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "size" TEXT NOT NULL,
    "extraPrice" DECIMAL(10,2),
    "optionsExtraPrice" DECIMAL(10,2),
    "options" JSONB NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderAddress" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "address2" TEXT,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "OrderAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GrossReceiptsLog" (
    "id" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "totalGross" DECIMAL(10,2) NOT NULL,
    "taxRate" DECIMAL(5,5) NOT NULL DEFAULT 0.00576,
    "taxDue" DECIMAL(10,2) NOT NULL,
    "submitted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrossReceiptsLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BusinessSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "businessName" TEXT NOT NULL DEFAULT 'Purple Butterfly Bouquets',
    "businessType" "public"."BusinessType" NOT NULL DEFAULT 'RETAIL_WHOLESALE',
    "state" TEXT NOT NULL DEFAULT 'DE',
    "taxId" TEXT,
    "salesTaxRate" DOUBLE PRECISION NOT NULL DEFAULT 0.00000,
    "grossReceiptsTaxRate" DOUBLE PRECISION NOT NULL DEFAULT 0.00576,
    "salesTaxesApplyToShipping" BOOLEAN NOT NULL DEFAULT false,
    "shippingFlatCents" INTEGER NOT NULL DEFAULT 1000,
    "shippingFreeOverCents" INTEGER NOT NULL DEFAULT 10000,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "email" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SocialLink" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "iconName" TEXT,
    "settingsId" TEXT NOT NULL,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BusinessHour" (
    "id" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "opensAt" TEXT NOT NULL,
    "closesAt" TEXT NOT NULL,
    "closed" BOOLEAN NOT NULL DEFAULT false,
    "settingsId" TEXT NOT NULL,

    CONSTRAINT "BusinessHour_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_id_key" ON "public"."Country"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserAddress_userId_key" ON "public"."UserAddress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderAddress_orderId_key" ON "public"."OrderAddress"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "GrossReceiptsLog_period_key" ON "public"."GrossReceiptsLog"("period");

-- AddForeignKey
ALTER TABLE "public"."UserAddress" ADD CONSTRAINT "UserAddress_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserAddress" ADD CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderAddress" ADD CONSTRAINT "OrderAddress_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderAddress" ADD CONSTRAINT "OrderAddress_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SocialLink" ADD CONSTRAINT "SocialLink_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "public"."BusinessSettings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BusinessHour" ADD CONSTRAINT "BusinessHour_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "public"."BusinessSettings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
