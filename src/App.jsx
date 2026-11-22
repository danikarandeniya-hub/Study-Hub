import { useState } from 'react'
import Header from './components/Header.jsx'
import Section from './components/Section.jsx'
import CourseList from './components/CourseList.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import FilterBar from './components/FilterBar.jsx'
import DailyQuote from './components/DailyQuote.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { courses } from './data/courses.js'

export default function App() {
  const [enrolledCodes, setEnrolledCodes] = useLocalStorage('enrolled', [])
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [filter, setFilter] = useState('all')

  function toggleEnrol(code) {
    setEnrolledCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    )
  }

  function addTask(text) {
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), text, done: false }])
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const enrolledCredits = courses
    .filter((c) => enrolledCodes.includes(c.code))
    .reduce((sum, c) => sum + c.credits, 0)

  const remaining = tasks.filter((t) => !t.done).length
  const visibleTasks = tasks.filter((t) =>
    filter === 'all' ? true : filter === 'active' ? !t.done : t.done
  )

  return (
    <main>
      <Header title="Study Hub" subtitle="Your courses in one place" />
      <Section title="Daily quote">
        <DailyQuote />
      </Section>
      <Section title="My courses">
        <p>
          Enrolled in {enrolledCodes.length} courses. {enrolledCredits} credits.
        </p>
        <CourseList
          courses={courses}
          enrolledCodes={enrolledCodes}
          onToggleEnrol={toggleEnrol}
        />
      </Section>
      <Section title="Study tasks">
        <TaskForm onAdd={addTask} />
        <FilterBar filter={filter} onChange={setFilter} />
        <p>{remaining} left</p>
        <TaskList
          tasks={visibleTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </Section>
    </main>
  )
}

