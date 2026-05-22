export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={!!todo.done}
        onChange={() => onToggle(todo.id, !!todo.done)}
      />
      <span className={todo.done ? 'done' : ''}>{todo.title}</span>
      <button className="delete" onClick={() => onDelete(todo.id)} aria-label="Delete">
        ✕
      </button>
    </div>
  )
}
