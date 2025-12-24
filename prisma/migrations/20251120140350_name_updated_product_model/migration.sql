-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "shortDescription" TEXT,
ADD COLUMN     "totalReviews" INTEGER NOT NULL DEFAULT 0;
