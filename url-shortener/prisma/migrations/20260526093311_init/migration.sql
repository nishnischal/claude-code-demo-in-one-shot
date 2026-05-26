-- CreateTable
CREATE TABLE "Url" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "longUrl" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClickLog" (
    "id" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "referrer" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "ClickLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_slug_key" ON "Url"("slug");

-- CreateIndex
CREATE INDEX "Url_slug_idx" ON "Url"("slug");

-- CreateIndex
CREATE INDEX "ClickLog_urlId_idx" ON "ClickLog"("urlId");

-- CreateIndex
CREATE INDEX "ClickLog_clickedAt_idx" ON "ClickLog"("clickedAt");

-- AddForeignKey
ALTER TABLE "ClickLog" ADD CONSTRAINT "ClickLog_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE CASCADE ON UPDATE CASCADE;
