export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li>
      <label className={task.done ? 'struck' : ''}>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />{' '}
        {task.text}
      </label>{' '}
      <button type="button" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  )
}
