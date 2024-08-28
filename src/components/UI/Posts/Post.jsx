import styles from './Posts.module.scss'
import { useEffect, useRef, useState } from 'react'
import { DividingLine } from '../DividingLine/DividingLine'
import { Comment } from '../Comment/Comment'
import { Triangle } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Post({ id, title, text, author, create_date, image, comments, comments_count, tags, tags_names }) {
  const textRef = useRef()
  const [isTextLarge, setIsTextLarge] = useState(false)
  const [fullText, setFullText] = useState(false)
  const [isShowComments, setIsShowComments] = useState(false)

  useEffect(() => {
    if(textRef.current.scrollHeight > textRef.current.clientHeight)
      setIsTextLarge(true)
    else
      setIsTextLarge(false)
  }, [])

  const showAllText = () => {
    setFullText(prev => !prev)
  }

  const showComments = () => {
    setIsShowComments(prev => !prev)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={`images/${image}`} alt="post_image" />
        </div>
        <div className={styles.content}>
          <div className={styles.author}>
            <span>{author}</span> - {create_date}
          </div>
          <div className={styles.title}>
            <span>---</span>{title}<span>---</span>
          </div>
          <div
            className={ `${styles.text} ${fullText ? styles.show : ''}` }
            ref={textRef}
          >
            {text}
          </div>
          <div className={styles.tags}>Тэги: {
            tags.map(id => {
              return `${tags_names.find(tag => tag.id === id).name}`
            }).join(', ')
          }</div>
          <div className={styles.comments_info} onClick={showComments}>
            Комментарии: {comments_count}
            { comments_count > 0 && <Triangle
              color="#d80101"
              size={10}
              fill='#d80101'
              className={`${styles.comments_toggle} ${isShowComments ? styles.show : ''}`}
            /> }
          </div>
        </div>
        <div className={styles.buttons}>
          <Link
            className={styles.go_to}
            to={`/post/${id}`}
          >Перейти</Link>
          { isTextLarge && <div className={styles.show_all} onClick={showAllText}>{ fullText ? 'Скрыть' : 'Показать' }</div> }
        </div>
      </div>
      <div className={`${styles.comments_container} ${isShowComments ? styles.show : ''}`}>
        <div>
          { comments.map(comment => {
            return <Comment key={comment.id} {...comment} />
          }) }
        </div>
      </div>
      <DividingLine width="50%" />
    </>
  )
} 