import React, {useState, useEffect} from 'react'
import './index.css'

// Example structure for task lists
// No initialLists, will fetch from backend

const TaskLists = ({selectedCategory}) => {
  // State variables
  const [tasks, setTasks] = useState([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState('normal')
  const [newTaskDueDate, setNewTaskDueDate] = useState('')
  const [newTaskReminder, setNewTaskReminder] = useState('')
  const [newTaskRepeat, setNewTaskRepeat] = useState('')
  const [newTaskNotes, setNewTaskNotes] = useState('')
  const [search, setSearch] = useState('')

  // Fetch tasks for selected category
  useEffect(() => {
    if (!selectedCategory) return
    fetch(
      `https://todoapplication-j07a.onrender.com/todos?category=${selectedCategory}`,
    )
      .then(res => res.json())
      .then(data => {
        setTasks(
          data.map(todo => ({
            id: todo.id,
            title: todo.todo,
            completed: todo.status === 'DONE',
            steps: todo.steps || [],
            dueDate: todo.dueDate || '',
            priority: todo.priority || 'normal',
            notes: todo.notes || '',
            starred: todo.starred || false,
            repeat: todo.repeat || '',
            reminder: todo.reminder || '',
            attachments: todo.attachments || [],
            history: todo.history || [],
          })),
        )
      })
  }, [selectedCategory])
  const toggleTaskCompletion = async taskId => {
    const task = tasks.find(t => t.id === taskId)
    const newStatus = task.completed ? 'TO DO' : 'DONE'
    await fetch(`https://todoapplication-j07a.onrender.com/todos/${taskId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({status: newStatus}),
    })
    // Refresh tasks
    fetch(
      `https://todoapplication-j07a.onrender.com/todos?category=${selectedCategory}`,
    )
      .then(res => res.json())
      .then(data => {
        setTasks(
          data.map(todo => ({
            id: todo.id,
            title: todo.todo,
            completed: todo.status === 'DONE',
            steps: [],
            dueDate: todo.dueDate || '',
            priority: todo.priority || 'normal',
            notes: '',
            starred: false,
            repeat: '',
            reminder: '',
            attachments: [],
            history: [],
          })),
        )
      })
  }
  const toggleTaskStar = taskId => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? {...task, starred: !task.starred} : task,
      ),
    )
  }
  const deleteTask = async taskId => {
    await fetch(`https://todoapplication-j07a.onrender.com/todos/${taskId}`, {
      method: 'DELETE',
    })
    // Refresh tasks
    fetch(
      `https://todoapplication-j07a.onrender.com/todos?category=${selectedCategory}`,
    )
      .then(res => res.json())
      .then(data => {
        setTasks(
          data.map(todo => ({
            id: todo.id,
            title: todo.todo,
            completed: todo.status === 'DONE',
            steps: [],
            dueDate: todo.dueDate || '',
            priority: todo.priority || 'normal',
            notes: '',
            starred: false,
            repeat: '',
            reminder: '',
            attachments: [],
            history: [],
          })),
        )
      })
  }
  const addStep = (taskId, stepText) => {
    setTasks(
      tasks.map(task =>
        task.id !== taskId
          ? task
          : {
              ...task,
              steps: [
                ...task.steps,
                {id: Date.now(), text: stepText, done: false},
              ],
            },
      ),
    )
  }
  const toggleStepDone = (taskId, stepId) => {
    setTasks(
      tasks.map(task =>
        task.id !== taskId
          ? task
          : {
              ...task,
              steps: task.steps.map(step =>
                step.id === stepId ? {...step, done: !step.done} : step,
              ),
            },
      ),
    )
  }

  // Add missing addTask function
  const addTask = async () => {
    if (!newTaskTitle.trim()) return
    const newTask = {
      id: Date.now(),
      todo: newTaskTitle,
      priority: newTaskPriority,
      status: 'TO DO',
      category: selectedCategory,
      dueDate: newTaskDueDate,
      reminder: newTaskReminder,
      repeat: newTaskRepeat,
      notes: newTaskNotes,
    }
    await fetch('https://todoapplication-j07a.onrender.com/todos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newTask),
    })
    setNewTaskTitle('')
    setNewTaskPriority('normal')
    setNewTaskDueDate('')
    setNewTaskReminder('')
    setNewTaskRepeat('')
    setNewTaskNotes('')
    // Refresh tasks
    fetch(
      `https://todoapplication-j07a.onrender.com/todos?category=${selectedCategory}`,
    )
      .then(res => res.json())
      .then(data => {
        setTasks(
          data.map(todo => ({
            id: todo.id,
            title: todo.todo,
            completed: todo.status === 'DONE',
            steps: todo.steps || [],
            dueDate: todo.dueDate || '',
            priority: todo.priority || 'normal',
            notes: todo.notes || '',
            starred: todo.starred || false,
            repeat: todo.repeat || '',
            reminder: todo.reminder || '',
            attachments: todo.attachments || [],
            history: todo.history || [],
          })),
        )
      })
  }

  return (
    <div className="tasklists-container">
      <h2>Tasks for: {selectedCategory || 'No List Selected'}</h2>
      <form
        className="add-task-form"
        onSubmit={e => {
          e.preventDefault()
          addTask()
        }}
      >
        <input
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          placeholder="New task title"
        />
        <select
          value={newTaskPriority}
          onChange={e => setNewTaskPriority(e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="high">High</option>
          <option value="low">Low</option>
        </select>
        <input
          type="date"
          value={newTaskDueDate}
          onChange={e => setNewTaskDueDate(e.target.value)}
        />
        <input
          type="datetime-local"
          value={newTaskReminder}
          onChange={e => setNewTaskReminder(e.target.value)}
          placeholder="Reminder"
        />
        <select
          value={newTaskRepeat}
          onChange={e => setNewTaskRepeat(e.target.value)}
        >
          <option value="">No Repeat</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <input
          value={newTaskNotes}
          onChange={e => setNewTaskNotes(e.target.value)}
          placeholder="Notes"
        />
        <button type="submit">Add Task</button>
      </form>
      <div style={{marginTop: 16}}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tasks"
        />
      </div>
      <ul className="tasks-list">
        {tasks
          .filter(task =>
            task.title.toLowerCase().includes(search.toLowerCase()),
          )
          .map(task => (
            <li key={task.id} className="task-card">
              <div className="task-header">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                  }}
                >
                  {task.title}
                </span>
                <span
                  className={task.starred ? 'star' : 'star inactive'}
                  onClick={() => toggleTaskStar(task.id)}
                  title="Star task"
                >
                  ★
                </span>
                <span
                  className="delete"
                  onClick={() => deleteTask(task.id)}
                  title="Delete"
                >
                  🗑
                </span>
              </div>
              <div className="task-details">
                Priority: {task.priority} | Due: {task.dueDate || 'None'} |
                Reminder: {task.reminder || 'None'} | Repeat:{' '}
                {task.repeat || 'None'}
              </div>
              <div className="task-details">Notes: {task.notes}</div>
              <div className="task-details">
                Attachments: {task.attachments.length}
              </div>
              <div className="task-details">History: {task.history.length}</div>
              <div className="task-details">Steps:</div>
              <ul className="steps-list">
                {task.steps.map(step => (
                  <li key={step.id}>
                    <input
                      type="checkbox"
                      checked={step.done}
                      onChange={() => toggleStepDone(task.id, step.id)}
                    />
                    <span
                      style={{
                        textDecoration: step.done ? 'line-through' : 'none',
                      }}
                    >
                      {step.text}
                    </span>
                  </li>
                ))}
              </ul>
              <AddStepInput taskId={task.id} addStep={addStep} />
            </li>
          ))}
      </ul>
    </div>
  )
}

// Subcomponent for adding steps
function AddStepInput({taskId, addStep}) {
  const [stepText, setStepText] = useState('')
  const handleAdd = () => {
    if (!stepText.trim()) return
    addStep(taskId, stepText)
    setStepText('')
  }
  return (
    <div style={{marginTop: 8}}>
      <input
        value={stepText}
        onChange={e => setStepText(e.target.value)}
        placeholder="Add step"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}

export default TaskLists
