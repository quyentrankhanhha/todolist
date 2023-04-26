import style from './TaskInput.module.scss'

export default function TaskInput() {
  return (
    <div className='mb-2'>
      <h1 className={style.title}>To do list</h1>
      <form className={style.form}>
        <input type='text' placeholder='Task' />
        <button type='submit'>+</button>
      </form>
    </div>
  )
}
