import styles from './TaskList.module.scss'

interface TaskListProps {
  doneTaskList?: boolean
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList } = props
  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Done' : 'To Do'}</h2>
      <div className={styles.tasks}>
        <div className={styles.task}>
          <input type='checkbox' className={styles.taskCheckbox} />
          <span className={`${styles.taskName} ${styles.taskNameDone}`}>Learn</span>
          <div className={styles.taskActions}>
            <button className={styles.taskBtn}>Edit</button>
            <button className={styles.taskBtn}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}
