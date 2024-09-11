import { Triangle } from 'lucide-react'
import styles from './CreatePost.module.scss'
import { useState } from 'react'
import { CreatePostForm } from '../CreatePostForm/CreatePostForm'

export function CreatePost() {
  const [isShow, setIsShow] = useState(false)

  return (
    <>
      <div className={styles.toggle} onClick={() => setIsShow(prev => !prev)}>
        Создать пост
        <Triangle
          color="#d80101"
          size={10}
          fill='#d80101'
          className={`${styles.toggle_sign} ${isShow ? styles.show : ''}`}
        />
      </div>

      <div className={`${styles.container} ${isShow ? styles.show : ''}`}>
        <div>
          <CreatePostForm />
        </div>
      </div>
    </>
  )
}