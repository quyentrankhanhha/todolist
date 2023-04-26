import { useState } from 'react'
import PropTypes from 'prop-types'
import { Todo } from '../../@types/todo.type'
import style from './TaskInput.module.scss'
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

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  finishEditTask: PropTypes.func.isRequired,
  currentTask: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired
    }),
    PropTypes.oneOf([null])
  ])
}
