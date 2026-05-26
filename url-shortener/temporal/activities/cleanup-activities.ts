import { log } from '@temporalio/activity'
import { prisma } from '@/lib/db'

const CLICK_LOG_RETENTION_DAYS = 90

export async function deleteOldClickLogs(): Promise<number> {
  const cutoff = new Date(Date.now() - CLICK_LOG_RETENTION_DAYS * 24 * 60 * 60 * 1000)
  log.info('Deleting click logs older than cutoff', { cutoff: cutoff.toISOString() })

  const result = await prisma.clickLog.deleteMany({
    where: { clickedAt: { lt: cutoff } },
  })

  log.info('Deleted old click logs', { count: result.count })
  return result.count
}
