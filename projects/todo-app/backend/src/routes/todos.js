import { Router } from 'express'
import db from '../db/client.js'

const router = Router()

router.get('/', (_req, res) => {
  const todos = db.prepare('SELECT * FROM todos ORDER BY id DESC').all()
  res.json(todos)
})

router.post('/', (req, res) => {
  const { title } = req.body
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'title is required' })
  }
  const stmt = db.prepare('INSERT INTO todos (title) VALUES (?)')
  const result = stmt.run(title.trim())
  const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(result.lastInsertRowid)
  res.status(201).json(todo)
})

router.patch('/:id', (req, res) => {
  const { done } = req.body
  if (typeof done !== 'boolean') {
    return res.status(400).json({ error: 'done must be a boolean' })
  }
  db.prepare('UPDATE todos SET done = ? WHERE id = ?').run(done ? 1 : 0, req.params.id)
  const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(req.params.id)
  if (!todo) return res.status(404).json({ error: 'not found' })
  res.json(todo)
})

router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM todos WHERE id = ?').run(req.params.id)
  if (result.changes === 0) return res.status(404).json({ error: 'not found' })
  res.status(204).end()
})

export default router
