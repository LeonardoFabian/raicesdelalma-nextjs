/*
  Warnings:

  - You are about to drop the column `link` on the `Product` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "link",
ADD COLUMN     "slug" TEXT NOT NULL;
