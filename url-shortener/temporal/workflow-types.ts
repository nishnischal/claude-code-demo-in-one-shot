export interface ClickWorkflowInput {
  urlId: string
  referrer: string | null
  userAgent: string | null
}

export const TASK_QUEUE = 'url-shortener'
export const CLICK_WORKFLOW_TYPE = 'logClickWorkflow'
export const CLEANUP_WORKFLOW_TYPE = 'urlExpiryCleanupWorkflow'
export const CLEANUP_SCHEDULE_ID = 'url-expiry-cleanup-daily'
