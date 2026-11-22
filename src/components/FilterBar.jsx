export default function FilterBar({ filter, onChange }) {
  return (
    <div className="filters">
      <button
        type="button"
        disabled={filter === 'all'}
        onClick={() => onChange('all')}
      >
        All
      </button>
      <button
        type="button"
        disabled={filter === 'active'}
        onClick={() => onChange('active')}
      >
        Active
      </button>
      <button
        type="button"
        disabled={filter === 'done'}
        onClick={() => onChange('done')}
      >
        Done
      </button>
    </div>
  )
}
