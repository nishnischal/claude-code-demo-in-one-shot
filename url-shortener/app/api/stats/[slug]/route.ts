import { prisma } from '@/lib/db'
import { isExpired } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const url = await prisma.url.findUnique({
    where: { slug },
    include: {
      clickLogs: {
        orderBy: { clickedAt: 'desc' },
        take: 100,
      },
    },
  })

  if (!url) {
    return Response.json({ error: 'URL not found' }, { status: 404 })
  }

  return Response.json({
    slug: url.slug,
    longUrl: url.longUrl,
    clicks: url.clicks,
    createdAt: url.createdAt,
    expiresAt: url.expiresAt,
    expired: isExpired(url.expiresAt),
    recentClicks: url.clickLogs.map((log) => ({
      clickedAt: log.clickedAt,
      referrer: log.referrer,
      userAgent: log.userAgent,
    })),
  })
}
