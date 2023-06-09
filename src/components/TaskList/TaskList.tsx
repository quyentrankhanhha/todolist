import PropTypes from 'prop-types'
import { Todo } from '../../@types/todo.type'
import styles from './TaskList.module.scss'

interface TaskListProps {
  doneTaskList?: boolean
  todo: Todo[]
  handleDoneTask: (id: string, done: boolean) => void
  startEditTask: (id: string) => void
  deleteTask: (id: string) => void
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList, todo, handleDoneTask, startEditTask, deleteTask } = props

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
              <button className={styles.taskBtn} onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

TaskList.propTypes = {
  doneTaskList: PropTypes.bool,
  todo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired
    })
  ),
  handleDoneTask: PropTypes.func,
  startEditTask: PropTypes.func,
  deleteTask: PropTypes.func
}
