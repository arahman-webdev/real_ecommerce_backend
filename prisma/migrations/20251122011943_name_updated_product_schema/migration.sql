/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "length" DOUBLE PRECISION,
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION,
ADD COLUMN     "width" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "ProductVarient" (
    "id" TEXT NOT NULL,
    "color" TEXT,
    "size" TEXT,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductVarient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_productId_key" ON "Product"("productId");

-- AddForeignKey
ALTER TABLE "ProductVarient" ADD CONSTRAINT "ProductVarient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
