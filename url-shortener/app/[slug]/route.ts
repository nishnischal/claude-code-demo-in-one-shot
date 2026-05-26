import { prisma } from '@/lib/db'
import { isExpired } from '@/lib/utils'
import { getTemporalClient } from '@/lib/temporal-client'
import { TASK_QUEUE, CLICK_WORKFLOW_TYPE } from '@/temporal/workflow-types'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

  const url = await prisma.url.findUnique({ where: { slug } })

  if (!url) {
    return Response.redirect(`${baseUrl}/?error=not_found`, 302)
  }

  if (isExpired(url.expiresAt)) {
    return Response.redirect(`${baseUrl}/?error=expired`, 302)
  }

  // Fire-and-forget via Temporal — click is recorded durably even if DB is briefly unavailable
  getTemporalClient()
    .then((client) =>
      client.workflow.start(CLICK_WORKFLOW_TYPE, {
        taskQueue: TASK_QUEUE,
        workflowId: `click-${url.id}-${Date.now()}`,
        args: [{
          urlId: url.id,
          referrer: new Headers(request.headers).get('referer') ?? null,
          userAgent: new Headers(request.headers).get('user-agent') ?? null,
        }],
      })
    )
    .catch((err) => console.error('Failed to start click workflow:', err))

  return Response.redirect(url.longUrl, 301)
}
