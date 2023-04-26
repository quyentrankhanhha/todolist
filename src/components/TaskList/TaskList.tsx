import { Todo } from '../../@types/todo.type'
import styles from './TaskList.module.scss'

interface TaskListProps {
  doneTaskList?: boolean
  todo: Todo[]
  handleDoneTask: (id: string, done: boolean) => void
  startEditTask: (name: string) => void
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList, todo, handleDoneTask, startEditTask } = props

  const onChangeCheckbox = (idTodo: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDoneTask(idTodo, event.target.checked)
  }
  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Done' : 'To Do'}</h2>
      <div className={styles.tasks}>
        {todo.map((task) => (
          <div className={styles.task} key={task.id}>
            <input
              type='checkbox'
              className={styles.taskCheckbox}
              checked={task.done}
              onChange={onChangeCheckbox(task.id)}
            />
            <span className={`${styles.taskName} ${task.done ? styles.taskNameDone : ''}`}>{task.name}</span>
            <div className={styles.taskActions}>
              <button className={styles.taskBtn} onClick={() => startEditTask(task.id)}>
                Edit
              </button>
              <button className={styles.taskBtn}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
