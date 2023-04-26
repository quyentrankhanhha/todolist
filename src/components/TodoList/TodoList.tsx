import { useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './TodoList.module.scss'
import { Todo } from '../../@types/todo.type'

export default function TodoList() {
  const [todo, setTodo] = useState<Todo[]>([])
  const [currentTask, setCurrentTask] = useState<Todo | null>(null)
  const todoTask = todo.filter((todo) => !todo.done)
  const doneTask = todo.filter((todo) => todo.done)

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodo((prev) => [...prev, todo])
  }

  const handleDoneTask = (id: string, done: boolean) => {
    setTodo((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }

  const startEditTask = (id: string) => {
    const findedTodo = todo.find((task) => task.id === id)
    if (findedTodo) {
      setCurrentTask(findedTodo)
    }
  }

  const editTask = (name: string) => {
    setCurrentTask((prev) => {
      if (prev) return { ...prev, name }
      return null
    })
  }

  const finishEditTask = () => {
    setTodo((prev) => {
      return prev.map((todo) => {
        if (todo.id === currentTask?.id) {
          return currentTask
        }
        return todo
      })
    })
    setCurrentTask(null)
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currentTask={currentTask} editTask={editTask} finishEditTask={finishEditTask} />
        <TaskList todo={todoTask} handleDoneTask={handleDoneTask} startEditTask={startEditTask} />
        <TaskList doneTaskList todo={doneTask} handleDoneTask={handleDoneTask} startEditTask={startEditTask} />
      </div>
    </div>
  )
}
