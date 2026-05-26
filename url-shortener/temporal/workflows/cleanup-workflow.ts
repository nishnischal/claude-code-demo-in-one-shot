import { proxyActivities, log } from '@temporalio/workflow'
import type * as cleanupActivities from '../activities/cleanup-activities'

const { deleteOldClickLogs } = proxyActivities<typeof cleanupActivities>({
  startToCloseTimeout: '5 minutes',
  retry: {
    maximumAttempts: 3,
  },
})

export async function urlExpiryCleanupWorkflow(): Promise<number> {
  log.info('Starting URL expiry cleanup workflow')
  const deleted = await deleteOldClickLogs()
  log.info('Cleanup complete', { deletedClickLogs: deleted })
  return deleted
}
