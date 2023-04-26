import { useState } from 'react'
import style from './TaskInput.module.scss'

interface TaskInputProps {
  addTodo: (name: string) => void
}
export default function TaskInput(props: TaskInputProps) {
  const { addTodo } = props
  const [name, setName] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addTodo(name)
    setName('')
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setName(value)
  }

  return (
    <div className='mb-2'>
      <h1 className={style.title}>To do list</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <input type='text' placeholder='Task' value={name} onChange={onChangeInput} />
        <button type='submit'>+</button>
      </form>
    </div>
  )
}
