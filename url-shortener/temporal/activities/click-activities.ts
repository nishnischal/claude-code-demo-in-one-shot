import { log } from '@temporalio/activity'
import { prisma } from '@/lib/db'
import type { ClickWorkflowInput } from '../workflow-types'

export async function recordClick({ urlId, referrer, userAgent }: ClickWorkflowInput): Promise<void> {
  log.info('Recording click', { urlId })
  await prisma.url.update({
    where: { id: urlId },
    data: {
      clicks: { increment: 1 },
      clickLogs: {
        create: { referrer, userAgent },
      },
    },
  })
}
