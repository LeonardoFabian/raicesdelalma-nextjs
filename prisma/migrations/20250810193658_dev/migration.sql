-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "thumbnail" SET DEFAULT '/uploads/default.jfif',
ALTER COLUMN "discountPercentage" SET DEFAULT 0,
ALTER COLUMN "discountPercentage" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "rating" SET DEFAULT 0;
