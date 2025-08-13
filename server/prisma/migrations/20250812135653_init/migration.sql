-- CreateTable
CREATE TABLE "public"."devil_fruits" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "currentUser" TEXT,
    "picture" TEXT,
    "categoria" TEXT NOT NULL,

    CONSTRAINT "devil_fruits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "devil_fruits_name_key" ON "public"."devil_fruits"("name");
