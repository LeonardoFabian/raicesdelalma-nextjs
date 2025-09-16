/*
  Warnings:

  - The `price` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `discountPercentage` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rating` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "price",
ADD COLUMN     "price" DECIMAL(10,2),
DROP COLUMN "discountPercentage",
ADD COLUMN     "discountPercentage" DECIMAL(5,2) DEFAULT 0,
DROP COLUMN "rating",
ADD COLUMN     "rating" DOUBLE PRECISION DEFAULT 0;
