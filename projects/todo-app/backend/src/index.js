import express from 'express'
import todosRouter from './routes/todos.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use('/api/todos', todosRouter)

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})
