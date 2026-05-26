import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import { NativeConnection, Worker } from '@temporalio/worker'
import { Client, Connection, ScheduleOverlapPolicy } from '@temporalio/client'
import * as clickActivities from './activities/click-activities'
import * as cleanupActivities from './activities/cleanup-activities'
import { TASK_QUEUE, CLEANUP_SCHEDULE_ID, CLEANUP_WORKFLOW_TYPE } from './workflow-types'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function ensureCleanupSchedule(client: Client) {
  try {
    await client.schedule.create({
      scheduleId: CLEANUP_SCHEDULE_ID,
      spec: { intervals: [{ every: '1 day' }] },
      action: {
        type: 'startWorkflow',
        workflowType: CLEANUP_WORKFLOW_TYPE,
        taskQueue: TASK_QUEUE,
        args: [],
      },
      policies: { overlap: ScheduleOverlapPolicy.SKIP },
    })
    console.log('Created cleanup schedule')
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && (err as { code: number }).code === 6) {
      console.log('Cleanup schedule already exists')
    } else {
      throw err
    }
  }
}

async function run() {
  const address = process.env.TEMPORAL_ADDRESS ?? 'localhost:7233'

  const nativeConnection = await NativeConnection.connect({ address })

  const worker = await Worker.create({
    connection: nativeConnection,
    workflowsPath: path.join(__dirname, 'workflows'),
    activities: { ...clickActivities, ...cleanupActivities },
    taskQueue: TASK_QUEUE,
  })

  const clientConnection = await Connection.connect({ address })
  const client = new Client({ connection: clientConnection })
  await ensureCleanupSchedule(client)

  console.log(`Temporal worker running on task queue: ${TASK_QUEUE}`)
  await worker.run()
}

run().catch((err) => {
  console.error('Worker failed:', err)
  process.exit(1)
})
