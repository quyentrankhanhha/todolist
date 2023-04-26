import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './TodoList.module.scss'
import { Todo } from '../../@types/todo.type'

// interface HandleNewTask {
//   (todo: Todo[]): Todo[]
// }

type HandleNewTask = (todos: Todo[]) => Todo[]

const syncReactToLocal = (handleNewTask: HandleNewTask) => {
  const todoString = localStorage.getItem('todo')
  const todoObj: Todo[] = JSON.parse(todoString || '[]')
  const newTodoObj = handleNewTask(todoObj)
  localStorage.setItem('todo', JSON.stringify(newTodoObj))
}

export default function TodoList() {
  const [todo, setTodo] = useState<Todo[]>([])
  const [currentTask, setCurrentTask] = useState<Todo | null>(null)
  const todoTask = todo.filter((todo) => !todo.done)
  const doneTask = todo.filter((todo) => todo.done)

  useEffect(() => {
    const todoString = localStorage.getItem('todo')
    const todoObj: Todo[] = JSON.parse(todoString || '[]')
    setTodo(todoObj)
  }, [])

  const addTodo = (name: string) => {
    const task: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodo((prev) => [...prev, task])
    const handler = (todosObj: Todo[]) => {
      return [...todosObj, task]
    }
    syncReactToLocal(handler)
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
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === currentTask?.id) {
          return currentTask
        }
        return todo
      })
    }
    setTodo(handler)
    setCurrentTask(null)
    syncReactToLocal(handler)
  }

  const deleteTask = (id: string) => {
    // while you are editting but want to delete
    if (currentTask) {
      setCurrentTask(null)
    }
    const handler = (todoObj: Todo[]) => {
      const findedIndexTask = todoObj.findIndex((todo) => todo.id === id)
      if (findedIndexTask > -1) {
        const result = [...todoObj]
        result.splice(findedIndexTask, 1)
        return result
      }
      return todoObj
    }
    setTodo(handler)
    syncReactToLocal(handler)
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currentTask={currentTask} editTask={editTask} finishEditTask={finishEditTask} />
        <TaskList
          todo={todoTask}
          handleDoneTask={handleDoneTask}
          startEditTask={startEditTask}
          deleteTask={deleteTask}
        />
        <TaskList
          doneTaskList
          todo={doneTask}
          handleDoneTask={handleDoneTask}
          startEditTask={startEditTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  )
}
