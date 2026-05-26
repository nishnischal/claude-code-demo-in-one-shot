import { proxyActivities, log } from '@temporalio/workflow'
import type * as clickActivities from '../activities/click-activities'
import type { ClickWorkflowInput } from '../workflow-types'

const { recordClick } = proxyActivities<typeof clickActivities>({
  startToCloseTimeout: '30 seconds',
  retry: {
    initialInterval: '1 second',
    backoffCoefficient: 2,
    maximumInterval: '30 seconds',
    maximumAttempts: 10,
  },
})

export async function logClickWorkflow(input: ClickWorkflowInput): Promise<void> {
  log.info('Starting click workflow', { urlId: input.urlId })
  await recordClick(input)
}
