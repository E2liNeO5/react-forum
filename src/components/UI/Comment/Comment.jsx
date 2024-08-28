import styles from './Comment.module.scss'

export function Comment({ author, text, create_date }) {
  return (
    <div className={styles.container}>
      <div className={styles.author}>{author} - {create_date}</div>
      {text}
    </div>
  )
}