import { useState } from 'react'
import style from './TaskInput.module.scss'
import { Todo } from '../../@types/todo.type'

interface TaskInputProps {
  addTodo: (name: string) => void
  currentTask: Todo | null
  editTask: (name: string) => void
  finishEditTask: () => void
}
export default function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTask, editTask, finishEditTask } = props
  const [name, setName] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTask) {
      finishEditTask()
      if (name) setName('')
    } else {
      addTodo(name)
      setName('')
    }
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (currentTask) {
      editTask(value)
    } else setName(value)
  }

  return (
    <div className='mb-2'>
      <h1 className={style.title}>To do list</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <input type='text' placeholder='Task' value={currentTask ? currentTask.name : name} onChange={onChangeInput} />
        <button type='submit'>{currentTask ? 'Edit' : 'Add'}</button>
      </form>
    </div>
  )
}
