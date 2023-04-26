import { useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './TodoList.module.scss'
import { Todo } from '../../@types/todo.type'

export default function TodoList() {
  const [todo, setTodo] = useState<Todo[]>([])

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

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} />
        <TaskList todo={todoTask} handleDoneTask={handleDoneTask} />
        <TaskList doneTaskList todo={doneTask} handleDoneTask={handleDoneTask} />
      </div>
    </div>
  )
}
